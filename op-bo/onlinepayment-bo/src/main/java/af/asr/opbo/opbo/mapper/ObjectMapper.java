package af.asr.opbo.opbo.mapper;

import af.asr.opbo.opbo.dto.AgentAccountCreditDTO;
import af.asr.opbo.opbo.dto.OrganizationAccountCreditDTO;
import af.asr.opbo.opbo.model.RectifiedJournalEntry;
import af.asr.opbo.util.AccountNumberUtility;
import af.asr.opbo.util.HijriDateUtility;

import java.math.BigDecimal;

public class ObjectMapper {

    public static RectifiedJournalEntry mapCredit(AgentAccountCreditDTO dto)
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

    public static RectifiedJournalEntry mapDebit(AgentAccountCreditDTO dto)
    {
        RectifiedJournalEntry journal = new RectifiedJournalEntry();
        journal.setDebitAmount(dto.getAmount());
        journal.setRjno(AccountNumberUtility.generateSequence());
        journal.setCreditAmount(new BigDecimal(0));
        journal.setRjReason(dto.getRjReason());
        journal.setAgentId(dto.getAgentId());
        journal.setEffectedDate(HijriDateUtility.getCurrentJalaliDateAsString());
        journal.setRjdate(dto.getRjDate());
//        journal.setRemarks(dto.toString());
        journal.setRjType(dto.getRjType());

        return journal;
    }


    public static RectifiedJournalEntry mapCredit(OrganizationAccountCreditDTO dto)
    {
        RectifiedJournalEntry journal = new RectifiedJournalEntry();
        journal.setCreditAmount(dto.getAmount());
        journal.setRjno(AccountNumberUtility.generateSequence());
        journal.setDebitAmount(new BigDecimal(0));
        journal.setRjReason(dto.getRjReason());
        journal.setOrganizationId(dto.getOrganizationId());
        journal.setEffectedDate(HijriDateUtility.getCurrentJalaliDateAsString());
        journal.setRjdate(dto.getRjDate());
//        journal.setRemarks(dto.toString());
        journal.setRjType(dto.getRjType());

        return journal;
    }

    public static RectifiedJournalEntry mapDebit(OrganizationAccountCreditDTO dto)
    {
        RectifiedJournalEntry journal = new RectifiedJournalEntry();
        journal.setCreditAmount(new BigDecimal(0));
        journal.setRjno(AccountNumberUtility.generateSequence());
        journal.setDebitAmount(dto.getAmount());
        journal.setRjReason(dto.getRjReason());
        journal.setOrganizationId(dto.getOrganizationId());
        journal.setEffectedDate(HijriDateUtility.getCurrentJalaliDateAsString());
        journal.setRjdate(dto.getRjDate());
//        journal.setRemarks(dto.toString());
        journal.setRjType(dto.getRjType());

        return journal;
    }

}
