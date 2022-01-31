package af.asr.opbo.opbo.service;

import af.asr.opbo.infrastructure.base.UserService;
import af.asr.opbo.opbo.dto.AgentAccountCreditDTO;
import af.asr.opbo.opbo.dto.BillCollectionDTO;
import af.asr.opbo.opbo.mapper.ObjectMapper;
import af.asr.opbo.opbo.model.*;
import af.asr.opbo.opbo.repository.*;
import af.asr.opbo.usermanagement.service.UserManagementService;
import af.asr.opbo.util.AccountNumberUtility;
import af.asr.opbo.util.HijriDateUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
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
        return repository.findById(id).get();
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

        RectifiedJournalEntry rectifiedJournalEntry = rectifiedJournalEntryRepository.save(ObjectMapper.map(dto));

        AgentLedger agentLedger = new AgentLedger();
        agentLedger.setAgentId(agent.getId());
        agentLedger.setCredit(dto.getAmount());
        agentLedger.setDebit(new BigDecimal(0));
        agentLedger.setBalanceDate(HijriDateUtility.getCurrentJalaliDateAsString());
        agentLedger.setRectifiedJournalEntryId(rectifiedJournalEntry.getId());
        agentLedgerRespository.save(agentLedger);
        return response;
    }

    public Bill queryBill(String billNo) {
        return billRepository.findByBillNoAndAmountPayFlag(billNo.trim(),false);
    }

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
        agentLedgerRespository.save(agentLedger);

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

//    public Map<String, Object> getObjectAndRevisions(String id) {
//        Map<String, Object> data =  new HashMap<>();
//        data.put("object", this.findOne(id));
//        data.put("revisions", this.repository.getRevisions(id));
//        return data;
//    }
}
