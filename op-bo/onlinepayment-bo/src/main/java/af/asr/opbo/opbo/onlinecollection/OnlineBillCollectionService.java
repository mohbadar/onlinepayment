package af.asr.opbo.opbo.onlinecollection;

import af.asr.opbo.infrastructure.base.UserService;
import af.asr.opbo.opbo.dto.BillCollectionDTO;
import af.asr.opbo.opbo.dto.IssueBillDTO;
import af.asr.opbo.opbo.dto.QueryOnlineBillInfoDTO;
import af.asr.opbo.opbo.dto.response.OnlineBillDetailsDTO;
import af.asr.opbo.opbo.enums.AuthorizationType;
import af.asr.opbo.opbo.enums.BillingChannel;
import af.asr.opbo.opbo.model.*;
import af.asr.opbo.opbo.onlinecollection.keycloack.KCAuth;
import af.asr.opbo.opbo.repository.AgentUserRelationRepository;
import af.asr.opbo.opbo.repository.BillRepository;
import af.asr.opbo.opbo.repository.BillTypeRepository;
import af.asr.opbo.opbo.repository.ThirdPartyIntegrationRepository;
import af.asr.opbo.opbo.service.AgentService;
import af.asr.opbo.opbo.service.CenterService;
import af.asr.opbo.util.AccountNumberUtility;
import af.asr.opbo.util.HijriDateUtility;
import af.gov.anar.core.infrastructure.exception.common.IOException;
import af.gov.anar.lib.json.exception.JsonMappingException;
import af.gov.anar.lib.json.exception.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Map;

@Service
public class OnlineBillCollectionService {

    @Autowired
    private KCAuth kcAuth;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private CenterService centerService;

    @Autowired
    private AgentService agentService;

    @Autowired
    private BillTypeRepository billTypeRepository;

    @Autowired
    private AgentUserRelationRepository agentUserRelationRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ThirdPartyIntegrationRepository thirdPartyIntegrationRepository;

    @Autowired
    private ApiClientService apiClientService;




//    http://localhost:8080/auth/realms/onlinepayment/
    public String queryOnlineBillInfo(QueryOnlineBillInfoDTO onlineBillInfoDTO) throws JsonProcessingException, JsonProcessingException, JsonProcessingException, JsonParseException, IOException, JsonMappingException, af.gov.anar.lib.json.exception.JsonProcessingException {

//        String token = kcAuth.getAccessToken();


        BillType billType = billTypeRepository.findById(onlineBillInfoDTO.getBillTypeId()).orElse(null);
        if(billType ==null || billType.getBillingChannel().getValue().equalsIgnoreCase(BillingChannel.OFFLINE.getValue()))
            throw new RuntimeException("BillTypeNotFoundException");
        ThirdPartyIntegration integration = thirdPartyIntegrationRepository.findById(billType.getThirdPartyIntegrationId()).orElse(null);
        if(integration == null)
            throw new RuntimeException("ThirdPartyIntegrationNotFoundException");

        if(integration.getAuthorizationType().getValue().equalsIgnoreCase(AuthorizationType.NO_AUTH.getValue())){

            String response = apiClientService.getBillInfoWithNoAuth(integration, onlineBillInfoDTO.getBillIdentifier());
            JsonObject convertedObject = new Gson().fromJson(response, JsonObject.class);
            convertedObject.addProperty("billTypeId", onlineBillInfoDTO.getBillTypeId());
            convertedObject.addProperty("organizationId", onlineBillInfoDTO.getOrganizationId());
            int numberOfItems = convertedObject.get("numberOfItems").getAsInt() == 0 ? 1 : convertedObject.get("numberOfItems").getAsInt();
            convertedObject.addProperty("numberOfItems", numberOfItems);
            System.out.println(convertedObject.toString());
            return convertedObject.toString();

        }else if(integration.getAuthorizationType().getValue().equalsIgnoreCase(AuthorizationType.BASIC_AUTH.getValue())) {

        }else if(integration.getAuthorizationType().getValue().equalsIgnoreCase(AuthorizationType.BEAR_TOKEN.getValue())) {
        }else if(integration.getAuthorizationType().getValue().equalsIgnoreCase(AuthorizationType.OAUTH2.getValue())) {
        }

        OnlineBillDetailsDTO dto = new OnlineBillDetailsDTO();
        dto.setBillNo(AccountNumberUtility.generateSequence());
        dto.setBillHolderName("Jamshid Ahmadzai");
        dto.setBillAmount(new BigDecimal(1500));
        dto.setBillDate(HijriDateUtility.getCurrentJalaliDateAsString());
        dto.setCycle("05");
        dto.setCycleYear("1400");
        dto.setPaid(false);
        dto.setNumberOfItems(5);
        dto.setOrganizationId(onlineBillInfoDTO.getOrganizationId());
        dto.setBillTypeId(onlineBillInfoDTO.getBillTypeId());

        return null;
    }

    public Map<String, Object> confirmOnlineBillPayment(OnlineBillDetailsDTO dto) {


        //find agent
        AgentUserRelation agentUserRelation = agentUserRelationRepository.findDistinctByAppUserId(userService.getId());
        if (agentUserRelation == null)
            throw new RuntimeException("AgentUserRelationNotFoundException");
        Agent agent = agentService.findOne(agentUserRelation.getAgentId());
        if(agent == null)
            throw new RuntimeException("AgentNotFoundException");

        //issue bill
        IssueBillDTO issueBillDTO = new IssueBillDTO();
        issueBillDTO.setBillTypeId(dto.getBillTypeId());
        issueBillDTO.setCenterId(agent.getCenterId());
        issueBillDTO.setNumberOfItems(dto.getNumberOfItems() <= 0?1:dto.getNumberOfItems());
        issueBillDTO.setOrganizationUniqueBillIdentifier(dto.getBillNo());
        Map<String, Object> map = centerService.issueBill(issueBillDTO, dto);

        Bill bill = (Bill)map.get("bill");

        if(bill == null)
            throw new RuntimeException("SavedBillNotFoundException");

        //make bill payment
        BillCollectionDTO billCollectionDTO = new BillCollectionDTO();
        billCollectionDTO.setBillNo(bill.getBillNo());
        billCollectionDTO.setPosted(true);
        billCollectionDTO.setPaymentType("OFFLINE_PAYMENT");
        billCollectionDTO.setBillNo(bill.getBillNo());
        billCollectionDTO.setPaidAmount(bill.getTotalAmount());
        billCollectionDTO.setTenderedAmount(bill.getTotalAmount());
        billCollectionDTO.setAgentId(agent.getId());
        billCollectionDTO.setBillingChannel(BillingChannel.ONLINE);

        Map<String, Object> collectionMap = agentService.collectBillPayment(billCollectionDTO);

        BillPayment billPayment = (BillPayment) collectionMap.get("billPayment");

        if(billPayment == null)
            throw new RuntimeException("SavedBillPaymentNotFoundException");

//        BillPayment confirmedPayment = agentService.confirmPayment(billPayment.getId());


        return collectionMap;
    }

}
