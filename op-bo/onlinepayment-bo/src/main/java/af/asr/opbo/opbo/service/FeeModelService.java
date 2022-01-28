package af.asr.opbo.opbo.service;

import af.asr.opbo.opbo.model.FeeModel;
import af.asr.opbo.opbo.repository.FeeModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class FeeModelService {

    @Autowired
    private FeeModelRepository feeModelRepository;

    public Iterable<FeeModel> findAll(){
        return feeModelRepository.findAll();
    }

    public FeeModel findById(String id)
    {
        return feeModelRepository.findById(id).orElse(null);
    }

    public FeeModel save(FeeModel feeModel)
    {
        return feeModelRepository.save(feeModel);
    }
}
