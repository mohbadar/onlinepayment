package af.asr.opbo.util;

import af.asr.opbo.opbo.model.Agent;
import org.apache.commons.lang.StringUtils;

import java.security.SecureRandom;

public class AccountNumberUtility {

    public static String generateAccountNumber(String provinceCode, Agent lastRecord)
    {
        return String.format("%s%s",provinceCode,new AccountNumberUtility().getNextAccountNoSequence(lastRecord));
    }

    public static String generateAccountNumber(String provinceCode)
    {
        return String.format("%s%s",provinceCode,getAccountNumberRandomSequence());
    }

    public String getNextAccountNoSequence(Agent lastRecord)
    {
        /**
         * Sudo Code
         * if lastRecord for consumer is null:
         *        generate new initAccountNo
         *        return initAccountNo
         * else if lastRecord exist
         *        get lastRecord's accountNo without Province Code
         *        Add 1 to the lastRecord's accountNo
         *        return the new AccountNo Sequence
         *
         */
        SecureRandom random = new SecureRandom();
        String initAccountNo = (System.currentTimeMillis() / 10000) + "" + random.nextInt(100) ;


        if (lastRecord == null) {
            return initAccountNo;
        }

        Long accNo = Long.valueOf(lastRecord.getAccountNo().substring(3));
        return (accNo+1) +"";
    }

    public static String getAccountNumberRandomSequence()
    {
        SecureRandom random = new SecureRandom();
        String accountNumberSequence = (System.nanoTime() / 100000) + "" + random.nextInt(100) ;
        return accountNumberSequence;
    }

    public static String generateSequence()
    {
        SecureRandom random = new SecureRandom();
        String sequence = (System.nanoTime() / 100000) + "" + random.nextInt(100) ;
        return sequence;
    }

    public static String RegistrationNumber(){

        String day = StringUtils.leftPad(String.valueOf(HijriDateUtility.getCurrentJalaliDateDay()), 2,"0");
        String month = StringUtils.leftPad(String.valueOf(HijriDateUtility.getCurrentJalaliDateMonth()), 2,"0");
        String year = String.valueOf(HijriDateUtility.getCurrentJalaliDateYear());
        SecureRandom random = new SecureRandom();
        String dateString = String.format("%s%s", String.format("%s", String.valueOf(System.nanoTime() / 100000000)),
                                            String.valueOf(random.nextInt(10000)));
        String sequence = String.format("%s%s%s%s",day,month,year,dateString);
        return sequence;
    }
}
