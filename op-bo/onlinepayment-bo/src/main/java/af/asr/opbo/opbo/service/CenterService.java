package af.asr.opbo.opbo.service;

import af.asr.opbo.infrastructure.base.UserService;
import af.asr.opbo.opbo.dto.IssueBillDTO;
import af.asr.opbo.opbo.dto.response.OnlineBillDetailsDTO;
import af.asr.opbo.opbo.enums.BillingChannel;
import af.asr.opbo.opbo.model.*;
import af.asr.opbo.opbo.repository.*;
import af.asr.opbo.usermanagement.service.UserManagementService;
import af.asr.opbo.util.AccountNumberUtility;
import af.asr.opbo.util.HijriDateUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class CenterService {


    @Autowired
    private CenterRepository repository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserManagementService userManagementService;

    @Autowired
    private CenterUserRelationRepository centerUserRelationRepository;

    @Autowired
    private FeeModelService feeModelService;

    @Autowired
    private BillTypeService billTypeService;

    @Autowired
    private BillRepository billRepository;



    public Center findByName(String name){
        return  repository.findByName(name);
    }

    public Center findByCode(String code)
    {
        return repository.findByCode(code);
    }

    public Center save(Center obj)
    {
        return repository.save(obj);
    }

    public Iterable<Center> findAll()
    {
        Iterable<Center> orgs = new ArrayList<>();

        if(userService.hasRole("view_full_provinces_list"))
        {
            orgs = repository.findAll();
        }else {
            orgs  = this.getUserCenters(userService.getPreferredUsername());
        }

        return orgs;
    }

    public Center findOne(String id)
    {
        return repository.findById(id).get();
    }


    public Iterable<Center> getUserTenants(){
        Iterable<Center> centers = new ArrayList<>();

        if(userService.hasRole("view_full_provinces_list"))
        {
            centers = repository.findAll();
        }else {
            centers  = this.getUserCenters(userService.getPreferredUsername());
        }
        return centers;
    }

    public List<Center> getUserCenters(String userName)
    {
        List<Center> centers = new ArrayList<>();
        String userId = userManagementService.getUserByUserName(userName).getId();
        List<CenterUserRelation> centerUserRelations = centerUserRelationRepository.findDistinctByAppUserId(userId);

        centerUserRelations.forEach(centerUserRelation -> {
            Center center = repository.findById(centerUserRelation.getCenterId()).get();
            if(!centers.contains(center))
                centers.add(center);
        });
        return centers;
    }

    public Map<String, Object> issueBill(IssueBillDTO dto, OnlineBillDetailsDTO onlineBillDetailsDTO) {
        Map<String, Object> response= new HashMap<>();


        BillType billType = billTypeService.findById(dto.getBillTypeId());
        if (billType == null)
            throw new RuntimeException("BillTypeNotFoundException");

        FeeModel feeModel= feeModelService.findById(billType.getFeeModelId());
        if (feeModel == null)
            throw new RuntimeException("FeeModelNotFoundException");

        Center center = repository.findById(dto.getCenterId()).orElse(null);
        if (center ==null)
            throw new RuntimeException("CenterNotFoundException");

        BigDecimal feeAmount = calculateFee(dto);
        BigDecimal agentFeeAmount = calculateAgentFee(dto);
        String billNo = AccountNumberUtility.generateSequence();


        Bill bill = new Bill();

        if(onlineBillDetailsDTO != null){

            bill.setBillAmount(onlineBillDetailsDTO.getBillAmount());
            bill.setBillDate(onlineBillDetailsDTO.getBillDate());
            bill.setBillingChannel(BillingChannel.ONLINE);
            bill.setBillNo(onlineBillDetailsDTO.getBillNo());
            bill.setTotalAmount(onlineBillDetailsDTO.getBillAmount());
            bill.setAmountPayFlag(true);

        }else{
            BigDecimal billAmount = calculateIssuedBill(dto);
            bill.setBillAmount(billAmount);
            bill.setBillDate(HijriDateUtility.getCurrentJalaliDateAsString());

            while(billRepository.findByBillNo(billNo) !=null)
                billNo = AccountNumberUtility.generateSequence();
            bill.setBillNo(billNo);
            bill.setTotalAmount(billAmount);
        }

        bill.setBillTypeId(dto.getBillTypeId());
        bill.setCenterId(dto.getCenterId());
        bill.setFeeAmount(feeAmount);
        bill.setAgentFeeAmount(agentFeeAmount);
        bill.setFeeModelId(feeModel.getId());
        bill.setCenterId(center.getId());
        bill.setOrganizationId(center.getOrganizationId());
        bill.setPrincePerItem(billType.getPricePerItem());
        bill.setNumberOfItems(dto.getNumberOfItems());
        bill.setOrganizationUniqueBillIdentifier(dto.getOrganizationUniqueBillIdentifier());
        bill.setStationaryAmount(new BigDecimal(0));
        bill.setOtherChargesAmount(new BigDecimal(0));

        Bill savedBill = billRepository.save(bill);

        response.put("billId", savedBill.getId());
        response.put("billNo", savedBill.getBillNo());
        response.put("billAmount", savedBill.getBillAmount());
        response.put("billDate", savedBill.getBillDate());
        response.put("bill", savedBill);
        return response;
    }

    private BigDecimal calculateIssuedBill(IssueBillDTO dto)
    {
        BigDecimal billTotalAmount = new BigDecimal(0);

        BillType billType = billTypeService.findById(dto.getBillTypeId());
        if (billType == null)
            throw new RuntimeException("BillTypeNotFoundException");

        FeeModel feeModel= feeModelService.findById(billType.getFeeModelId());
        if (feeModel == null)
            throw new RuntimeException("FeeModelNotFoundException");

        BigDecimal pricePerItem= billType.getPricePerItem();
        Integer numberOfItems = dto.getNumberOfItems();

        // calculate Bill
        billTotalAmount= pricePerItem.multiply(new BigDecimal(numberOfItems));
        return billTotalAmount;
    }

    private BigDecimal calculatePercentage(BigDecimal rate, BigDecimal total) {
        BigDecimal percentageAmount = total.multiply(BigDecimal.valueOf((double)rate.floatValue()/100.0));
        return percentageAmount;
    }

    private BigDecimal calculateFee(IssueBillDTO dto)
    {
        BillType billType = billTypeService.findById(dto.getBillTypeId());
        if (billType == null)
            throw new RuntimeException("BillTypeNotFoundException");

        FeeModel feeModel= feeModelService.findById(billType.getFeeModelId());
        if (feeModel == null)
            throw new RuntimeException("FeeModelNotFoundException");

        BigDecimal pricePerItem= billType.getPricePerItem();
        Integer numberOfItems = dto.getNumberOfItems();

        BigDecimal totalFee = new BigDecimal(0);
        if (feeModel.getType()=="PERCENTAGE")
        {
            for (int i=0; i<numberOfItems; i++){
                totalFee.add(calculatePercentage(feeModel.getPercentage(),pricePerItem));
            }
        }else {
            totalFee = feeModel.getAmount().multiply(new BigDecimal(numberOfItems));
        }
        return totalFee;
    }


    private BigDecimal calculateAgentFee(IssueBillDTO dto)
    {
        BillType billType = billTypeService.findById(dto.getBillTypeId());
        if (billType == null)
            throw new RuntimeException("BillTypeNotFoundException");

        FeeModel feeModel= feeModelService.findById(billType.getFeeModelId());
        if (feeModel == null)
            throw new RuntimeException("FeeModelNotFoundException");

        BigDecimal pricePerItem= billType.getPricePerItem();
        Integer numberOfItems = dto.getNumberOfItems();

        BigDecimal totalFee = new BigDecimal(0);
        if (feeModel.getType()=="PERCENTAGE")
        {
            for (int i=0; i<numberOfItems; i++){
                totalFee.add(calculatePercentage(feeModel.getAgentFeePercentage(),pricePerItem));
            }
        }else {
            totalFee = feeModel.getAgentFeeAmount().multiply(new BigDecimal(numberOfItems));
        }
        return totalFee;
    }


//    public Map<String, Object> getObjectAndRevisions(String id) {
//        Map<String, Object> data =  new HashMap<>();
//        data.put("object", this.findOne(id));
//        data.put("revisions", this.repository.getRevisions(id));
//        return data;
//    }
}
