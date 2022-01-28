package af.asr.opbo.opbo.service;

import af.asr.opbo.opbo.model.Bill;
import af.asr.opbo.opbo.model.BillType;
import af.asr.opbo.opbo.model.FeeModel;
import af.asr.opbo.opbo.repository.BillTypeRepository;
import af.asr.opbo.opbo.repository.FeeModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class BillTypeService {

    @Autowired
    private BillTypeRepository billTypeRepository;

    public Iterable<BillType> findAll(){
        return billTypeRepository.findAll();
    }

    public BillType findById(String id)
    {
        return billTypeRepository.findById(id).orElse(null);
    }

    public BillType save(BillType billType)
    {
        return billTypeRepository.save(billType);
    }
}
