package af.asr.opbo.opbo.mapper;

import af.asr.opbo.opbo.dto.AgentAccountCreditDTO;
import af.asr.opbo.opbo.model.RectifiedJournalEntry;
import af.asr.opbo.util.AccountNumberUtility;
import af.asr.opbo.util.HijriDateUtility;

import java.math.BigDecimal;

public class ObjectMapper {

    public static RectifiedJournalEntry map(AgentAccountCreditDTO dto)
    {
        RectifiedJournalEntry journal = new RectifiedJournalEntry();
        journal.setCreditAmount(dto.getAmount());
        journal.setRjno(AccountNumberUtility.generateSequence());
        journal.setDebitAmount(new BigDecimal(0));
        journal.setRjReason(dto.getRjReason());
        journal.setAgentId(dto.getAgentId());
        journal.setEffectedDate(HijriDateUtility.getCurrentJalaliDateAsString());
        journal.setRjdate(dto.getRjDate());
//        journal.setRemarks(dto.toString());
        journal.setRjType(dto.getRjType());

        return journal;
    }

}
