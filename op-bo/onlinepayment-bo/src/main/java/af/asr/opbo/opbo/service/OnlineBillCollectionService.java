package af.asr.opbo.opbo.service;

import af.asr.opbo.opbo.dto.QueryOnlineBillInfoDTO;
import af.asr.opbo.opbo.dto.response.OnlineBillDetailsDTO;
import af.asr.opbo.util.AccountNumberUtility;
import af.asr.opbo.util.HijriDateUtility;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class OnlineBillCollectionService {

    public OnlineBillDetailsDTO queryOnlineBillInfo(QueryOnlineBillInfoDTO onlineBillInfoDTO) {
        OnlineBillDetailsDTO dto = new OnlineBillDetailsDTO();
        dto.setBillNo(AccountNumberUtility.generateSequence());
        dto.setBillHolderName("Jamshid Ahmadzai");
        dto.setBillAmount(new BigDecimal(1030));
        dto.setBillDate(HijriDateUtility.getCurrentJalaliDateAsString());
        dto.setCycle("05");
        dto.setCycleYear("1400");
        dto.setPaid(false);

        return dto;
    }

    public OnlineBillDetailsDTO confirmOnlineBillPayment(OnlineBillDetailsDTO dto) {

        return null;
    }
}
