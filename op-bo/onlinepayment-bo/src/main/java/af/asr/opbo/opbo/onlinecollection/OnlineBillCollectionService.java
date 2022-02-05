package af.asr.opbo.opbo.onlinecollection;

import af.asr.opbo.infrastructure.base.UserService;
import af.asr.opbo.opbo.dto.BillCollectionDTO;
import af.asr.opbo.opbo.dto.IssueBillDTO;
import af.asr.opbo.opbo.dto.QueryOnlineBillInfoDTO;
import af.asr.opbo.opbo.dto.response.OnlineBillDetailsDTO;
import af.asr.opbo.opbo.enums.BillingChannel;
import af.asr.opbo.opbo.model.Agent;
import af.asr.opbo.opbo.model.AgentUserRelation;
import af.asr.opbo.opbo.model.Bill;
import af.asr.opbo.opbo.model.BillPayment;
import af.asr.opbo.opbo.repository.AgentUserRelationRepository;
import af.asr.opbo.opbo.repository.BillRepository;
import af.asr.opbo.opbo.repository.BillTypeRepository;
import af.asr.opbo.opbo.service.AgentService;
import af.asr.opbo.opbo.service.CenterService;
import af.asr.opbo.util.AccountNumberUtility;
import af.asr.opbo.util.HijriDateUtility;
import af.gov.anar.core.infrastructure.exception.common.IOException;
import af.gov.anar.lib.json.exception.JsonMappingException;
import af.gov.anar.lib.json.exception.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Map;

@Service
public class OnlineBillCollectionService {

    @Autowired
    private KCAuth kcAuth;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private CenterService centerService;

    @Autowired
    private AgentService agentService;

    @Autowired
    private BillTypeRepository billTypeRepository;

    @Autowired
    private AgentUserRelationRepository agentUserRelationRepository;

    @Autowired
    private UserService userService;




//    http://localhost:8080/auth/realms/onlinepayment/
    public OnlineBillDetailsDTO queryOnlineBillInfo(QueryOnlineBillInfoDTO onlineBillInfoDTO) throws JsonProcessingException, JsonProcessingException, JsonProcessingException, JsonParseException, IOException, JsonMappingException, af.gov.anar.lib.json.exception.JsonProcessingException {

//        String token = kcAuth.getAccessToken();

        OnlineBillDetailsDTO dto = new OnlineBillDetailsDTO();
        dto.setBillNo(AccountNumberUtility.generateSequence());
        dto.setBillHolderName("Jamshid Ahmadzai");
        dto.setBillAmount(new BigDecimal(1500));
        dto.setBillDate(HijriDateUtility.getCurrentJalaliDateAsString());
        dto.setCycle("05");
        dto.setCycleYear("1400");
        dto.setPaid(false);
        dto.setNumberOfItems(5);
        dto.setOrganizationId(onlineBillInfoDTO.getOrganizationId());
        dto.setBillTypeId(onlineBillInfoDTO.getBillTypeId());

        return dto;
    }

    public Map<String, Object> confirmOnlineBillPayment(OnlineBillDetailsDTO dto) {


        //find agent
        AgentUserRelation agentUserRelation = agentUserRelationRepository.findDistinctByAppUserId(userService.getId());
        if (agentUserRelation == null)
            throw new RuntimeException("AgentUserRelationNotFoundException");
        Agent agent = agentService.findOne(agentUserRelation.getAgentId());
        if(agent == null)
            throw new RuntimeException("AgentNotFoundException");

        //issue bill
        IssueBillDTO issueBillDTO = new IssueBillDTO();
        issueBillDTO.setBillTypeId(dto.getBillTypeId());
        issueBillDTO.setCenterId(agent.getCenterId());
        issueBillDTO.setNumberOfItems(dto.getNumberOfItems() <= 0?1:dto.getNumberOfItems());
        issueBillDTO.setOrganizationUniqueBillIdentifier(dto.getBillNo());
        Map<String, Object> map = centerService.issueBill(issueBillDTO, dto);

        Bill bill = (Bill)map.get("bill");

        if(bill == null)
            throw new RuntimeException("SavedBillNotFoundException");

        //make bill payment
        BillCollectionDTO billCollectionDTO = new BillCollectionDTO();
        billCollectionDTO.setBillNo(bill.getBillNo());
        billCollectionDTO.setPosted(true);
        billCollectionDTO.setPaymentType("OFFLINE_PAYMENT");
        billCollectionDTO.setBillNo(bill.getBillNo());
        billCollectionDTO.setPaidAmount(bill.getTotalAmount());
        billCollectionDTO.setTenderedAmount(bill.getTotalAmount());
        billCollectionDTO.setAgentId(agent.getId());
        billCollectionDTO.setBillingChannel(BillingChannel.ONLINE);

        Map<String, Object> collectionMap = agentService.collectBillPayment(billCollectionDTO);

        BillPayment billPayment = (BillPayment) collectionMap.get("billPayment");

        if(billPayment == null)
            throw new RuntimeException("SavedBillPaymentNotFoundException");

//        BillPayment confirmedPayment = agentService.confirmPayment(billPayment.getId());


        return collectionMap;
    }









}
