package af.asr.opbo.opbo.controller;

import af.asr.opbo.infrastructure.audit.annotation.Auditable;
import af.asr.opbo.opbo.dto.QueryOnlineBillInfoDTO;
import af.asr.opbo.opbo.dto.response.OnlineBillDetailsDTO;
import af.asr.opbo.util.AccountNumberUtility;
import af.asr.opbo.util.HijriDateUtility;
import af.gov.anar.core.infrastructure.exception.common.IOException;
import af.gov.anar.lib.json.exception.JsonMappingException;
import af.gov.anar.lib.json.exception.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping(value = "/public")
public class TestController {


//    @Auditable
    @GetMapping("/bill-inquiry/{billNo}")
    public ResponseEntity<OnlineBillDetailsDTO> queryOnlineBillInfo(@PathVariable(required = true, name = "billNo") String billNo) {

        OnlineBillDetailsDTO dto = new OnlineBillDetailsDTO();
        dto.setBillNo(billNo);
        dto.setBillHolderName("Jamshid Ahmadzai");
        dto.setBillAmount(new BigDecimal(1500));
        dto.setBillDate(HijriDateUtility.getCurrentJalaliDateAsString());
        dto.setCycle("05");
        dto.setCycleYear("1400");
        dto.setNumberOfItems(5);

        return ResponseEntity.ok(dto);
    }


    @PostMapping("/post-bill")
    public ResponseEntity<String> postBill(@RequestBody String billData)  {

//        OnlineBillDetailsDTO dto = new OnlineBillDetailsDTO();
//        dto.setBillNo(billNo);
//        dto.setBillHolderName("Jamshid Ahmadzai");
//        dto.setBillAmount(new BigDecimal(1500));
//        dto.setBillDate(HijriDateUtility.getCurrentJalaliDateAsString());
//        dto.setCycle("05");
//        dto.setCycleYear("1400");

        return ResponseEntity.ok(billData);
    }




}
