package af.asr.opbo.opbo.service;


import af.asr.opbo.opbo.model.Agent;
import af.asr.opbo.opbo.model.Province;
import af.asr.opbo.opbo.repository.AgentRepository;
import af.asr.opbo.opbo.repository.ProvinceRepository;
import af.asr.opbo.util.AccountNumberUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class AccountNumberService {

    public final static String ACCOUNT_NUMBER_GENERATION_TYPE ="sequence";
    private static AgentRepository agentRepository;
    private static ProvinceRepository provinceRepository;

    public static String generateAccountNoByProvinceCode(String provinceCode)
    {
        if(ACCOUNT_NUMBER_GENERATION_TYPE.equalsIgnoreCase("random"))
        {
            String accNo = AccountNumberUtility.generateAccountNumber(provinceCode);
            return accNo;
        }else {
            Agent lastRecord = agentRepository.findTopByOrderByCreateDateDesc();
            String accNo = AccountNumberUtility.generateAccountNumber(provinceCode, lastRecord);
            return accNo;
        }

    }


    public static String generateAccountNoByProvinceId(String provinceId)
    {
        Province province = provinceRepository.findById(provinceId).get();

        if(ACCOUNT_NUMBER_GENERATION_TYPE.equalsIgnoreCase("random"))
        {
            String accNo = AccountNumberUtility.generateAccountNumber(province.getProvinceCode());
            return accNo;
        }else {
            Agent lastRecord = agentRepository.findTopByOrderByCreateDateDesc();
            String accNo = AccountNumberUtility.generateAccountNumber(province.getProvinceCode(), lastRecord);
            return accNo;
        }

    }


    @Autowired
    public void setAgentRepository(AgentRepository agentRepository)
    {
        this.agentRepository= agentRepository;
    }

    @Autowired
    public void setProvinceRepository(ProvinceRepository provinceRepository)
    {
        this.provinceRepository= provinceRepository;
    }

}
