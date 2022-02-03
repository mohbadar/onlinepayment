package af.asr.opbo.opbo.service;

import af.asr.opbo.opbo.dto.GenerateDateBasedStatementDTO;
import af.asr.opbo.opbo.repository.AgentLedgerRespository;
import af.asr.opbo.opbo.repository.AgentRepository;
import af.asr.opbo.opbo.repository.BillPaymentRepository;
import af.asr.opbo.opbo.repository.BillRepository;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;

@Service
public class OrganizationAdminService {

    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private AgentLedgerRespository agentLedgerRespository;

    @Autowired
    private BillPaymentRepository billPaymentRepository;

    public List<Object> generateDateBasedStatement(GenerateDateBasedStatementDTO dto){

        Gson gson = new Gson();
        Type type = new TypeToken<List<Object>>() {}.getType();
        boolean status = dto.getStatus().equalsIgnoreCase("CONFIRMED") ? true: false;
        List<String> statements = billPaymentRepository.getDateBasedCenterStatement(dto.getCenterId(),status, dto.getStartDate(), dto.getEndDate());
        List<Object> responseDTO = gson.fromJson(String.valueOf(statements), type);

        return responseDTO;
    }
}
