package af.asr.opbo.opbo.service;

import af.asr.opbo.infrastructure.base.UserService;
import af.asr.opbo.opbo.model.Agent;
import af.asr.opbo.opbo.model.AgentUserRelation;
import af.asr.opbo.opbo.repository.AgentRepository;
import af.asr.opbo.opbo.repository.AgentUserRelationRepository;
import af.asr.opbo.opbo.repository.CenterRepository;
import af.asr.opbo.opbo.repository.CenterUserRelationRepository;
import af.asr.opbo.usermanagement.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
        List<AgentUserRelation> agentUserRelations = agentUserRelationRepository.findDistinctByAppUserId(userId);

        agentUserRelations.forEach(centerUserRelation -> {
            Agent agent = repository.findById(centerUserRelation.getAgentId()).get();
            if(!agents.contains(agent))
                agents.add(agent);
        });
        return agents;
    }

//    public Map<String, Object> getObjectAndRevisions(String id) {
//        Map<String, Object> data =  new HashMap<>();
//        data.put("object", this.findOne(id));
//        data.put("revisions", this.repository.getRevisions(id));
//        return data;
//    }
}
