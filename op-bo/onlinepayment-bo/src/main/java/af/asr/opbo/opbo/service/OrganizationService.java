package af.asr.opbo.opbo.service;

import af.asr.opbo.infrastructure.base.UserService;
import af.asr.opbo.opbo.dto.OrganizationAccountCreditDTO;
import af.asr.opbo.opbo.mapper.ObjectMapper;
import af.asr.opbo.opbo.model.*;

import af.asr.opbo.opbo.repository.OrganizationLedgerRepository;
import af.asr.opbo.opbo.repository.OrganizationRepository;
import af.asr.opbo.opbo.repository.OrganizationUserRelationRepository;
import af.asr.opbo.opbo.repository.RectifiedJournalEntryRepository;
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
public class OrganizationService {

    @Autowired
    private OrganizationRepository repository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserManagementService userManagementService;

    @Autowired
    private OrganizationUserRelationRepository organizationUserRelationRepository;

    @Autowired
    private OrganizationLedgerRepository organizationLedgerRepository;
    @Autowired
    private RectifiedJournalEntryRepository rectifiedJournalEntryRepository;



    public Organization findByName(String name){
        return  repository.findByName(name);
    }

    public Organization findByCode(String code)
    {
        return repository.findByCode(code);
    }

    public Organization save(Organization obj)
    {
        //generate accountno
        String accountNo = AccountNumberService.generateAccountNoByProvinceId(obj.getProvinceId());
        if(repository.findByAccountNo(accountNo) != null)
            throw new RuntimeException("Account Already Exist Exception");
        obj.setAccountNo(accountNo);
        return repository.save(obj);
    }

    public Iterable<Organization> findAll()
    {
        Iterable<Organization> orgs = new ArrayList<>();

        if(userService.hasRole("view_full_provinces_list"))
        {
            orgs = repository.findAll();
        }else {
            orgs  = this.getUserOrganizations(userService.getPreferredUsername());
        }

        return orgs;
    }

    public Organization findOne(String id)
    {
        return repository.findById(id).get();
    }


    public Iterable<Organization> getUserTenants(){
        Iterable<Organization> organizations = new ArrayList<>();

        if(userService.hasRole("view_full_provinces_list"))
        {
            organizations = repository.findAll();
        }else {
            organizations  = this.getUserOrganizations(userService.getPreferredUsername());
        }
        return organizations;
    }

    public List<Organization> getUserOrganizations(String userName)
    {
        List<Organization> organizations = new ArrayList<>();
        String userId = userManagementService.getUserByUserName(userName).getId();
        List<OrganizationUserRelation> organizationUserRelations = organizationUserRelationRepository.findDistinctByAppUserId(userId);

        organizationUserRelations.forEach(organizationUserRelation -> {
            Organization organization = repository.findById(organizationUserRelation.getOrganizationId()).get();
            if(!organizations.contains(organization))
                organizations.add(organization);
        });
        return organizations;
    }

//    public Map<String, Object> getObjectAndRevisions(String id) {
//        Map<String, Object> data =  new HashMap<>();
//        data.put("object", this.findOne(id));
//        data.put("revisions", this.repository.getRevisions(id));
//        return data;
//    }
    
    public Organization findByAccountNo(String accountNo){
        return repository.findByAccountNo(accountNo.trim());
    }


    public Map<String, Object> creditOrganizationAccount(OrganizationAccountCreditDTO dto)
    {
        Map<String, Object> response = new HashMap<>();

        Organization organization = repository.findByAccountNo(dto.getAccountNumber());

        if(organization == null)
            throw  new RuntimeException("OrganizationNotFoundException");

        dto.setOrganizationId(organization.getId());

        RectifiedJournalEntry rectifiedJournalEntry = rectifiedJournalEntryRepository.save(ObjectMapper.mapCredit(dto));

        OrganizationLedger organizationLedger = new OrganizationLedger();
        organizationLedger.setOrganizationId(organization.getId());
        organizationLedger.setCredit(dto.getAmount());
        organizationLedger.setDebit(new BigDecimal(0));
        organizationLedger.setBalanceDate(HijriDateUtility.getCurrentJalaliDateAsString());
        organizationLedger.setRectifiedJournalEntryId(rectifiedJournalEntry.getId());
        organizationLedger.setChannel(dto.getRjType());
        organizationLedger.setTransactionId(AccountNumberUtility.generateSequence());
        organizationLedgerRepository.save(organizationLedger);
        return response;
    }


    public Map<String, Object> getBalanceSheet(String accountNo) {
        Map<String, Object> data = new HashMap<>();
        Organization organization= repository.findByAccountNo(accountNo.trim());
        if(organization==null)
            throw new RuntimeException("OrganizationtNotFoundException");
        data.put("organization", organization);
        data.put("ledgers", organizationLedgerRepository.findByOrganizationId(organization.getId()));
        data.put("balance", organizationLedgerRepository.getOrganizationBalanceByOrganizationId(organization.getId()));
        return data;
    }


    public Map<String, Object> debitOrganizationAccount(OrganizationAccountCreditDTO dto)
    {
        Map<String, Object> response = new HashMap<>();

        Organization organization = repository.findByAccountNo(dto.getAccountNumber());

        if(organization == null)
            throw  new RuntimeException("OrganizationNotFoundException");

        dto.setOrganizationId(organization.getId());

        RectifiedJournalEntry rectifiedJournalEntry = rectifiedJournalEntryRepository.save(ObjectMapper.mapDebit(dto));

        OrganizationLedger organizationLedger = new OrganizationLedger();
        organizationLedger.setOrganizationId(organization.getId());
        organizationLedger.setDebit(dto.getAmount());
        organizationLedger.setCredit(new BigDecimal(0));
        organizationLedger.setBalanceDate(HijriDateUtility.getCurrentJalaliDateAsString());
        organizationLedger.setRectifiedJournalEntryId(rectifiedJournalEntry.getId());
        organizationLedger.setChannel(dto.getRjType());
        organizationLedger.setTransactionId(AccountNumberUtility.generateSequence());
        organizationLedgerRepository.save(organizationLedger);
        return response;
    }
}
