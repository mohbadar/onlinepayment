package af.asr.opbo.util;

import com.github.eloyzone.jalalicalendar.DateConverter;
import com.github.eloyzone.jalalicalendar.JalaliDate;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.text.DateFormat;
import org.apache.commons.lang.StringUtils;

public class HijriDateUtility {

    public static String DELIMITER = "/";


    public static String addDaysToDate(String date, int numberOfDaysToAdd)
    {
        Calendar c = Calendar.getInstance();
        Date endDate = HijriDateUtility.convertJalaliStringToGregorianDate(date);

        c.setTime(endDate);
        c.add(java.util.Calendar.DAY_OF_MONTH, numberOfDaysToAdd);
        Date finalDate = c.getTime();
        return HijriDateUtility.parseJalaliDateToString(HijriDateUtility.convertGregorianToHijri(finalDate));

    }

    public static Date convertHijriToGregorian(int year, int month, int day)
    {
        // Create an object of DateConverter, its the main class that converts calendars
        DateConverter dateConverter = new DateConverter();

        // Convert Jalali date to Gregorian
        LocalDate localdate= dateConverter.jalaliToGregorian(year, month, day);

        return convertLocalDateToDate(localdate);

    }

    public static JalaliDate getJalaliDate(String date)
    {

        int year = HijriDateUtility.getYearOfDate(date);
        int month = HijriDateUtility.getMonthOfDate(date) ;
        int day = HijriDateUtility.getDayOfDateString(date);

        JalaliDate jalaliDate = new JalaliDate(year,month,day);

        return jalaliDate;

    }

    public static String createHijriDate(int year, int month, int day)
    {


        JalaliDate jalaliDate = new JalaliDate(year,month,day);

//        String dateString = String.format("%s/%s/%s",
//                String.valueOf(year),String.valueOf(month), String.valueOf(day)
//        );

        return parseJalaliDateToString(jalaliDate);

    }

    public static Date convertHijriToGregorian(Date date)
    {
        // Create an object of DateConverter, its the main class that converts calendars
        DateConverter dateConverter = new DateConverter();

        // Convert Jalali date to Gregorian
        LocalDate localdate= dateConverter.jalaliToGregorian(date.getYear(), date.getMonth(), date.getDay());

        return convertLocalDateToDate(localdate);

    }

    public static JalaliDate convertGregorianToHijri(Date date)
    {
        // Create an object of DateConverter, its the main class that converts calendars
        DateConverter dateConverter = new DateConverter();
        
        //default time zone
        ZoneId defaultZoneId = ZoneId.systemDefault();

        LocalDate localDate = date.toInstant().atZone(defaultZoneId).toLocalDate();
        // Convert Gregorian date to Jalali
        JalaliDate hijriDate = dateConverter.gregorianToJalali(localDate.getYear(), localDate.getMonthValue(), localDate.getDayOfMonth());

        return hijriDate;
    }

    public static Date convertLocalDateToDate(LocalDate localDate)
    {
        //default time zone
        ZoneId defaultZoneId = ZoneId.systemDefault();
        //local date + atStartOfDay() + default time zone + toInstant() = Date
        Date date = Date.from(localDate.atStartOfDay(defaultZoneId).toInstant());
        return date;
    }

    public static Date parseDate(String pattern, String date)  {
        Date formattedDate= null;
        try {
            return new SimpleDateFormat(pattern).parse(date);
        } catch (ParseException e) {
            return new Date();
        }
    }

    public static String parseDateToString(Date date)  {
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        return dateFormat.format(date);  
    }

    public static String normalizeDariDate(String date)  {
        String rawData = new String(date);
        if(!rawData.startsWith("13")){
            date = "13"+date;
        }
        return date;
    }

    public static Date parseDhariDate(String date)  {

        String rawData = new String(date);
        if(!rawData.startsWith("13")){
            date = "13"+date;
        }

//        //System.out.println("Date >"+ date);
        String pattern = "yyyy/MM/dd";
        Date formattedDate= null;
        try {
            return new SimpleDateFormat(pattern).parse(date);
        } catch (ParseException e) {
            return HijriDateUtility.parseDate("yyyy/MM/dd", HijriDateUtility.getCurrentJalaliDateAsString());
        }
    }


    public static String parseJalaliDateToString(JalaliDate jalaliDate)  {
        /*
        * This function returns a string representation of the jalali date in the form of for example 1399-01-14
        */

        String year = String.valueOf(jalaliDate.getYear());
        String month = StringUtils.leftPad(String.valueOf(jalaliDate.getMonthPersian().getValue()), 2,"0");
        String day = StringUtils.leftPad(String.valueOf(jalaliDate.getDay()), 2,"0");

        return year + DELIMITER + month + DELIMITER + day;
    }


    public static Date convertJalaliDateToGregorianDate(JalaliDate jalaliDate)  {
        // Create an object of DateConverter, its the main class that converts calendars
        DateConverter dateConverter = new DateConverter();

        LocalDate gregorianLocalDate = dateConverter.jalaliToGregorian(
                                                        jalaliDate.getYear(), 
                                                        jalaliDate.getMonthPersian() , 
                                                        jalaliDate.getDay());
        Date gregorianDate = Date.from(gregorianLocalDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        
        return gregorianDate;
    }


    public static Date createDateObjectFromJalaliDate(JalaliDate jalaliDate)  {
        /*
            This function returns a date object set to the year, month and day from the given jalali date 
        */

        LocalDate localDate = LocalDate.of(jalaliDate.getYear(), jalaliDate.getMonthPersian().getValue(), jalaliDate.getDay());
        Date date = convertLocalDateToDate(localDate);

        return date;
    }


    public static JalaliDate getCurrentJalaliDate()  {
        /*
            This method returns current date in jalali date time as a date object
        */
        // setting a dummy date just to avoid the error
        
        try{
            Date currentDate = new Date();
            // This format yyyy/MM/dd works correctly for syntax of 1399-01-13
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
            String currentDateAsString = formatter.format(currentDate);
            currentDate = formatter.parse(currentDateAsString);
    
            JalaliDate jalaliCurrentDate = convertGregorianToHijri(currentDate);
            return jalaliCurrentDate;
        }
        catch(java.text.ParseException e){
            System.out.println("An Error occured while getting current date: " + e.getMessage());
            // setting a dummy date just to avoid the error of no return
            return new JalaliDate(1399,01,01);
        }

    }

    
    public static String getCurrentJalaliDateAsString()  {
        JalaliDate currentJalaliDate = getCurrentJalaliDate();
        String currentJalaliDateAsString = String.format("%s/%s/%s",
                                                currentJalaliDate.getYear(), 
                                                StringUtils.leftPad(
                                                    String.valueOf(currentJalaliDate.getMonthPersian().getValue()), 2,"0"
                                                ),
                                                StringUtils.leftPad(String.valueOf(currentJalaliDate.getDay()), 2, "0")
                                            );
        return currentJalaliDateAsString;

    }

    public static Integer getYearOfDateString(String date)
    {
       return Integer.valueOf(date.split("/")[0]);

    }

    public static Integer getMonthOfDateString(String date)
    {
        return Integer.valueOf(date.split("/")[1]);

    }
    public static Integer getDayOfDateString(String date)
    {
        return Integer.valueOf(date.split("/")[2]);

    }

    public static String getCurrentJalaliDateAsString(String pattern)  {
        /*
            This method returns current time in jalali date time as a string object
        */

        JalaliDate currentJalaliDate = getCurrentJalaliDate();

        String currentJalaliDateAsString = String.format(pattern,
                currentJalaliDate.getYear(),
                StringUtils.leftPad(
                        String.valueOf(currentJalaliDate.getMonthPersian().getValue()), 2,"0"
                ),
                StringUtils.leftPad(String.valueOf(currentJalaliDate.getDay()), 2, "0")
        );
        return currentJalaliDateAsString;

    }


    public static Date convertJalaliStringToGregorianDate(String jalaliDateString)  {
        /*
            This method returns a Date Representation of a JalaliDate string in the format 1399-01-13
        */

        String[] jalaliDateStringSplit = jalaliDateString.split(DELIMITER);
        return convertHijriToGregorian(Integer.parseInt(jalaliDateStringSplit[0]), Integer.parseInt(jalaliDateStringSplit[1]), Integer.parseInt(jalaliDateStringSplit[2]));
    }

    
    public static int getCurrentJalaliDateDay()  {
        /*
            This method returns an int representing the current day of jalali date
        */

        return getCurrentJalaliDate().getDay();
    }

    
    public static int getCurrentJalaliDateMonth()  {
        /*
            This method returns an int representing the current month of jalali date
        */

        return getCurrentJalaliDate().getMonthPersian().getValue();
    }

    
    public static int getCurrentJalaliDateYear()  {
        /*
            This method returns an int representing the current year of jalali date
        */

        return getCurrentJalaliDate().getYear();
    }

    public static int getYearOfDate(String date) {

        String[] jalaliDateStringSplit = date.split(DELIMITER);
        return Integer.parseInt(jalaliDateStringSplit[0]);
    }

    public static int getMonthOfDate(String date) {

        String[] jalaliDateStringSplit = date.split(DELIMITER);
        return Integer.parseInt(jalaliDateStringSplit[1]);
    }
}
