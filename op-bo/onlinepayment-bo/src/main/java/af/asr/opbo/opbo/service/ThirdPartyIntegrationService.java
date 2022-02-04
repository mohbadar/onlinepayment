package af.asr.opbo.opbo.service;

import af.asr.opbo.opbo.model.BillType;
import af.asr.opbo.opbo.model.ThirdPartyIntegration;
import af.asr.opbo.opbo.repository.BillTypeRepository;
import af.asr.opbo.opbo.repository.ThirdPartyIntegrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ThirdPartyIntegrationService {

    @Autowired
    private ThirdPartyIntegrationRepository thirdPartyIntegrationRepository;

    public Iterable<ThirdPartyIntegration> findAll(){
        return thirdPartyIntegrationRepository.findAll();
    }

    public ThirdPartyIntegration findById(String id)
    {
        return thirdPartyIntegrationRepository.findById(id).orElse(null);
    }

    public ThirdPartyIntegration save(ThirdPartyIntegration thirdPartyIntegration)
    {
        return thirdPartyIntegrationRepository.save(thirdPartyIntegration);
    }
}
