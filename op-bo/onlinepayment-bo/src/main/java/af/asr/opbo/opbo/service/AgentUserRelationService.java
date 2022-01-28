package af.asr.opbo.opbo.service;

import af.asr.opbo.opbo.model.AgentUserRelation;
import af.asr.opbo.opbo.model.CenterUserRelation;
import af.asr.opbo.opbo.repository.AgentUserRelationRepository;
import af.asr.opbo.opbo.repository.CenterUserRelationRepository;
import af.asr.opbo.usermanagement.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgentUserRelationService {

    @Autowired
    private AgentUserRelationRepository repository;

    @Autowired
    private UserManagementService userManagementService;

    public List<AgentUserRelation> findByAppUserId(String appUserId){
        return repository.findDistinctByAppUserId(appUserId);
    }

    public List<AgentUserRelation> findByAgentId(String id){
        return repository.findByAgentId(id);
    }

    //@PreAuthorize("hasAuthority('configuration_general_province')")
    public AgentUserRelation save(AgentUserRelation obj)
    {
        return repository.save(obj);
    }
}
