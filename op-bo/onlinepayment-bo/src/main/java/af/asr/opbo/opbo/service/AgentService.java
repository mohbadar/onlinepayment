package af.asr.opbo.opbo.service;

import af.asr.opbo.infrastructure.base.UserService;
import af.asr.opbo.opbo.dto.AgentAccountCreditDTO;
import af.asr.opbo.opbo.dto.BillCollectionDTO;
import af.asr.opbo.opbo.dto.response.UserBillPaymentStatementResponseDTO;
import af.asr.opbo.opbo.enums.BillingChannel;
import af.asr.opbo.opbo.mapper.ObjectMapper;
import af.asr.opbo.opbo.model.*;
import af.asr.opbo.opbo.repository.*;
import af.asr.opbo.usermanagement.service.UserManagementService;
import af.asr.opbo.util.AccountNumberUtility;
import af.asr.opbo.util.HijriDateUtility;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class AgentService {

    @Autowired
    private AgentRepository repository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserManagementService userManagementService;

    @Autowired
    private AgentUserRelationRepository agentUserRelationRepository;

    @Autowired
    private AccountNumberService accountNumberService;

    @Autowired
    private RectifiedJournalEntryRepository rectifiedJournalEntryRepository;

    @Autowired
    private AgentLedgerRespository agentLedgerRespository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private BillPaymentRepository billPaymentRepository;

    @Autowired
    private OrganizationLedgerRepository organizationLedgerRepository;

    @Autowired
    private AgentFeeRepository agentFeeRepository;

    @Autowired
    private AgentPaymentRepository agentPaymentRepository;


    public Agent findByPhone(String phone){
        return  repository.findByPhone(phone);
    }

    public Agent findByAccountNo(String accountNo)
    {
        return repository.findByAccountNo(accountNo);
    }

    public Agent save(Agent obj)
    {
        //generate accountno
        String accountNo = AccountNumberService.generateAccountNoByProvinceId(obj.getProvinceId());
        if(repository.findByAccountNo(accountNo) != null)
            throw new RuntimeException("Account Already Exist Exception");

        obj.setAccountNo(accountNo);
        return repository.save(obj);
    }

    public Iterable<Agent> findAll()
    {
        Iterable<Agent> orgs = new ArrayList<>();

        if(userService.hasRole("view_full_provinces_list"))
        {
            orgs = repository.findAll();
        }else {
            orgs  = this.getUserAgents(userService.getPreferredUsername());
        }

        return orgs;
    }

    public Agent findOne(String id)
    {
        return repository.findById(id).orElse(null);
    }


    public Iterable<Agent> getUserTenants(){
        Iterable<Agent> agents = new ArrayList<>();

        if(userService.hasRole("view_full_provinces_list"))
        {
            agents = repository.findAll();
        }else {
            agents  = this.getUserAgents(userService.getPreferredUsername());
        }
        return agents;
    }

    public List<Agent> getUserAgents(String userName)
    {
        List<Agent> agents = new ArrayList<>();
        String userId = userManagementService.getUserByUserName(userName).getId();
        AgentUserRelation agentUserRelations = agentUserRelationRepository.findDistinctByAppUserId(userId);

        Agent agent = repository.findById(agentUserRelations.getAgentId()).get();
            if(!agents.contains(agent))
                agents.add(agent);
        return agents;
    }

    public Map<String, Object> creditAgentAccount(AgentAccountCreditDTO dto) {

        Map<String, Object> response = new HashMap<>();

        Agent agent = repository.findByAccountNo(dto.getAccountNumber());

        if(agent == null)
            throw  new RuntimeException("AgentNotFoundException");

        dto.setAgentId(agent.getId());

        RectifiedJournalEntry rectifiedJournalEntry = rectifiedJournalEntryRepository.save(ObjectMapper.mapCredit(dto));

        AgentLedger agentLedger = new AgentLedger();
        agentLedger.setAgentId(agent.getId());
        agentLedger.setCredit(dto.getAmount());
        agentLedger.setDebit(new BigDecimal(0));
        agentLedger.setBalanceDate(HijriDateUtility.getCurrentJalaliDateAsString());
        agentLedger.setRectifiedJournalEntryId(rectifiedJournalEntry.getId());
        agentLedger.setTransactionId(AccountNumberUtility.generateSequence());
        agentLedgerRespository.save(agentLedger);
        return response;
    }


    public Map<String, Object> makeAgentPayment(AgentAccountCreditDTO dto) {

        Map<String, Object> response = new HashMap<>();

        Agent agent = repository.findByAccountNo(dto.getAccountNumber());

        if(agent == null)
            throw  new RuntimeException("AgentNotFoundException");

        dto.setAgentId(agent.getId());

        RectifiedJournalEntry rectifiedJournalEntry = rectifiedJournalEntryRepository.save(ObjectMapper.mapCredit(dto));

        AgentPayment agentPayment = new AgentPayment();
        agentPayment.setAgentId(agent.getId());
        agentPayment.setRectifiedJournalEntryId(rectifiedJournalEntry.getId());
        agentPayment.setChannel(dto.getRjType());
        agentPayment.setPaymentAmount(dto.getAmount());
        agentPayment.setPaymentDate(HijriDateUtility.getCurrentJalaliDateAsString());
        agentPayment.setTransactionId(AccountNumberUtility.generateSequence());

        agentPaymentRepository.save(agentPayment);
        return response;
    }



    public Map<String, Object> debitAgentAccount(AgentAccountCreditDTO dto) {

        Map<String, Object> response = new HashMap<>();

        Agent agent = repository.findByAccountNo(dto.getAccountNumber());

        if(agent == null)
            throw  new RuntimeException("AgentNotFoundException");

        dto.setAgentId(agent.getId());

        RectifiedJournalEntry rectifiedJournalEntry = rectifiedJournalEntryRepository.save(ObjectMapper.mapDebit(dto));

        AgentLedger agentLedger = new AgentLedger();
        agentLedger.setAgentId(agent.getId());
        agentLedger.setDebit(dto.getAmount());
        agentLedger.setCredit(new BigDecimal(0));
        agentLedger.setBalanceDate(HijriDateUtility.getCurrentJalaliDateAsString());
        agentLedger.setRectifiedJournalEntryId(rectifiedJournalEntry.getId());
        agentLedger.setTransactionId(AccountNumberUtility.generateSequence());
        agentLedgerRespository.save(agentLedger);
        return response;
    }


    public Bill queryBill(String billNo) {
        return billRepository.findByBillNoAndAmountPayFlag(billNo.trim(),false);
    }

    @Transactional
    public Map<String, Object> collectBillPayment(BillCollectionDTO dto) {

        Map<String, Object> data = new HashMap<>();



        AgentUserRelation agentUserRelation = agentUserRelationRepository.findDistinctByAppUserId(userService.getId());
        if(agentUserRelation == null)
            throw new RuntimeException("NoSuchAgentOfUserFoundException");

        Agent agent = repository.findById(agentUserRelation.getAgentId()).orElse(null);
        if(agent == null)
            throw  new RuntimeException("NoSuchAgentFoundException");

        BigDecimal agentBalance = agentLedgerRespository.getAgentBalanceByAgentId(agent.getId());
        if(agentBalance.compareTo(dto.getPaidAmount()) < 0)
            throw new RuntimeException("InSuffecintAmountException");

        Bill bill = billRepository.findByBillNo(dto.getBillNo());
        if(bill == null)
            throw new RuntimeException("NoSuchBillFoundException");

        String receiptNo = AccountNumberUtility.generateSequence();
        while(billPaymentRepository.findByReceiptNo(receiptNo) !=null)
            receiptNo = AccountNumberUtility.generateSequence();

        BillPayment billPayment = new BillPayment();
        billPayment.setAgentId(agent.getId());
        billPayment.setBillId(bill.getId());
        billPayment.setTarrifId(bill.getTarrifId());
        billPayment.setCenterId(bill.getCenterId());
        billPayment.setOrganizationId(bill.getOrganizationId());
        billPayment.setProvinceId(agent.getProvinceId());
        billPayment.setBillTypeId(bill.getBillTypeId());
        billPayment.setFeeModelId(bill.getFeeModelId());
        billPayment.setPaymentDate(HijriDateUtility.getCurrentJalaliDateAsString());
        billPayment.setPaidAmount(dto.getPaidAmount());
        billPayment.setCycle(bill.getCycle());
        billPayment.setCycleYear(bill.getCycleYear());
        billPayment.setReceiptNo(receiptNo);
        billPayment.setTenderedAmount(dto.getTenderedAmount());
        billPayment.setPaymentType(dto.getPaymentType());
        billPayment.setPosted(true);
        billPayment.setBillingChannel(dto.getBillingChannel() == null ? BillingChannel.OFFLINE: dto.getBillingChannel());

        bill.setAmountPayFlag(true);
        billRepository.save(bill);

        BillPayment savedBillPayment = billPaymentRepository.save(billPayment);


        AgentLedger agentLedger = new AgentLedger();
        agentLedger.setAgentId(agent.getId());
        agentLedger.setDebit(dto.getPaidAmount());
        agentLedger.setCredit(new BigDecimal(0));
        agentLedger.setBalanceDate(HijriDateUtility.getCurrentJalaliDateAsString());
        agentLedger.setBillPaymentId(savedBillPayment.getId());
        agentLedger.setCycle(bill.getCycle());
        agentLedger.setCycleYear(bill.getCycleYear());
        agentLedger.setTransactionId(AccountNumberUtility.generateSequence());
        AgentLedger savedAgentLedger = agentLedgerRespository.save(agentLedger);

        AgentFee agentFee = new AgentFee();
        agentFee.setAgentId(agent.getId());
        agentFee.setCleared(false);
        agentFee.setFeeAmount(bill.getAgentFeeAmount());
        agentFee.setFeeDate(HijriDateUtility.getCurrentJalaliDateAsString());
        agentFee.setBillId(bill.getId());
        agentFee.setBillPaymentId(billPayment.getId());
        agentFee.setAgentId(agent.getId());
        agentFee.setAgentLedgerId(savedAgentLedger.getId());
        agentFee.setTransactionId(savedAgentLedger.getTransactionId());
        agentFee.setAgentAccountNo(agent.getAccountNo());
        agentFee.setOrganizationId(bill.getOrganizationId());
        agentFeeRepository.save(agentFee);

        data.put("agent", agent);
        data.put("bill", bill);
        data.put("billPayment", billPayment);
        data.put("status", HttpStatus.OK);
        data.put("message", "Your Payment Request is Processed");


        return data;
    }

    public Map<String, Object> printDuplicateSlip(String billNo) {

        Map<String, Object> data = new HashMap<>();
        AgentUserRelation agentUserRelation = agentUserRelationRepository.findDistinctByAppUserId(userService.getId());
        if(agentUserRelation == null)
            throw new RuntimeException("NoSuchAgentOfUserFoundException");

        Agent agent = repository.findById(agentUserRelation.getAgentId()).orElse(null);
        if(agent == null)
            throw  new RuntimeException("NoSuchAgentFoundException");


        Bill bill = billRepository.findByBillNoAndAmountPayFlag(billNo,true);
        if(bill == null)
            throw new RuntimeException("NoSuchBillFoundException");

        List<BillPayment> billPayments = billPaymentRepository.findByBillIdOrderByCreateDateDesc(bill.getId());

        BillPayment billPayment = null;
        if(billPayments.size() > 0)
            billPayment= billPayments.get(0);

        if(billPayment == null)
            throw new RuntimeException("NoBillPaymentFoundException");


        data.put("agent", agent);
        data.put("bill", bill);
        data.put("billPayment", billPayment);
        data.put("status", HttpStatus.OK);
        data.put("message", "Your Payment Request is Processed");


        return data;
    }

    public Map<String, Object> getBalanceSheet(String accountNo) {
        Map<String, Object> data = new HashMap<>();
        Agent agent= repository.findByAccountNo(accountNo.trim());
        if(agent==null)
            throw new RuntimeException("AgentNotFoundException");
        data.put("agent", agent);
        data.put("ledgers", agentLedgerRespository.findByAgentId(agent.getId()));
        data.put("balance", agentLedgerRespository.getAgentBalanceByAgentId(agent.getId()));
        return data;
    }

    public Map<String, Object> queryBillPayment(String receiptNo) {

        Map<String, Object> data = new HashMap<>();
        BillPayment billPayment = billPaymentRepository.findByReceiptNo(receiptNo.trim());
        if(billPayment==null)
            throw new RuntimeException("BillPaymentNotFoundException");

        Bill bill = billRepository.findById(billPayment.getBillId()).orElse(null);
        if(bill == null )
            throw  new RuntimeException("BillNotFoundException");

        Agent agent= repository.findById(billPayment.getAgentId()).orElse(null);
        if(agent==null)
            throw new RuntimeException("AgentNotFoundException");

        data.put("agent", agent);
        data.put("billPayment", billPayment);
        data.put("bill", bill);
        return data;
    }

    public BillPayment confirmPayment(String paymentId) {
        BillPayment billPayment = billPaymentRepository.findById(paymentId.trim()).orElse(null);
        if(billPayment==null)
            throw new RuntimeException("BillPaymentNotFoundException");

        billPayment.setConfirmed(true);
        billPayment.setConfirmUserId(userService.getId());
        billPayment.setConfirmUserName(userService.getPreferredUsername());
        billPayment.setConfirmDate(HijriDateUtility.getCurrentJalaliDateAsString());

        BillPayment billPaymentSaved= billPaymentRepository.save(billPayment);

        OrganizationLedger organizationLedger = new OrganizationLedger();
        organizationLedger.setOrganizationId(billPayment.getOrganizationId());
        organizationLedger.setBalanceDate(HijriDateUtility.getCurrentJalaliDateAsString());
        organizationLedger.setDebit(new BigDecimal(0));
        organizationLedger.setCredit(billPaymentSaved.getPaidAmount());
        organizationLedger.setBillPaymentId(billPaymentSaved.getId());
        organizationLedger.setBillId(billPaymentSaved.getBillId());
        organizationLedger.setTransactionId(AccountNumberUtility.generateSequence());
        organizationLedger.setChannel(billPayment.getChannelId());
        organizationLedgerRepository.save(organizationLedger);

        return billPaymentSaved;
    }

    public List<UserBillPaymentStatementResponseDTO> getUserBillStatement() {
        String userName = userService.getPreferredUsername();

        List<String> statements = billPaymentRepository.getUserBillStatement(userName);

        Gson gson = new Gson();
        Type type = new TypeToken<List<UserBillPaymentStatementResponseDTO>>() {
        }.getType();
        List<UserBillPaymentStatementResponseDTO> responseDTO = gson.fromJson(String.valueOf(statements), type);

        return responseDTO;
    }

    public List<AgentFee> getAgentFees(String accountNo) {


        Agent agent= repository.findByAccountNo(accountNo.trim());
        if(agent==null)
            throw new RuntimeException("AgentNotFoundException");
        return agentFeeRepository.findByAgentIdAndCleared(agent.getId(), false);
    }

    public void approveFees(List<AgentFee> agentFees) {

        agentFees.forEach(agentFee -> {
            agentFee.setCleared(true);
            agentFee.setClearanceDate(HijriDateUtility.getCurrentJalaliDateAsString());
            agentFeeRepository.save(agentFee);

            Bill bill = billRepository.findById(agentFee.getBillId()).orElse(null);
            if(bill ==null )
                throw new RuntimeException("BillNotFoundException");
            bill.setClearedWithAgent(true);
            bill.setAgentFeeId(agentFee.getId());
            bill.setAgentClearanceDate(HijriDateUtility.getCurrentJalaliDateAsString());
            billRepository.save(bill);
        });
    }

//    public Map<String, Object> getObjectAndRevisions(String id) {
//        Map<String, Object> data =  new HashMap<>();
//        data.put("object", this.findOne(id));
//        data.put("revisions", this.repository.getRevisions(id));
//        return data;
//    }
}
