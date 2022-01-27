package af.gov.anar.service_kit.infrastructure.constant;

public class ApplicationGenericConstants {


//    ::::::::::::::::::::::::: Service Constant ::::::::::::::::::::::::::::
    public static final String APPLICATION_ID = "SBRESHNA-V1";
    public static final String APPLICATION_NAME = "SBRESHNA-V1";
    // Application Name
    private static final String APP_NAME = " eBreshna - ";
    public static final String CLIENT_JAR_DECRYPTION = APP_NAME + "CLIENT_JAR_DECRYPTION - ";
    public static final String SOFTWARE_INSTALLATION_HANDLER = APP_NAME + "SOFTWARE_INSTALLATION_HANDLER";

//    Components
    private static final String SYNC = APP_NAME + "SYNC - ";
    private static final String AUDIT_LOG_SYNC = APP_NAME + "AUDIT_LOG_SYNCHER - ";

//    :::::::::::::::::::: LOG FACTORY CONSTANTS ::::::::::::::::::::::::::::::::::
    public static  boolean  APPENDABLE =true;
    public static  String   APPENDER_NAME = "org.apache.log4j.RollingFileAppender";
    public static  String   APPENDER_FILE_NAME = "logs/ebreshna.log";
    public static  String   APPENDER_FILE_NAME_PATTERN = "logs/ebreshna-%d{yyyy/MM/dd-HH}-%i.log";
    public static  String   APPENDER_MAX_FILE_SIZE = "5MB";
    public static  String   APPENDER_TOTAL_CAPACITY = "50MB";
    public static  Integer  APPENDER_MAX_HISTORY  = 10;
    public static  boolean  APPENDER_IMMEDIATE_FLUSH = true;
    public static  boolean  APPENDER_PRUDENT = true;


    public static final String AUDIT_SERVICE_LOGGER_TITLE = SYNC + "AUDIT_MANAGER_SERVICE";
    public static final String AUDIT_LOG_DELETION_CONFIGURED_DAYS = "anar.ebreshna.audit_log_deletion_configured_days";
    public static final String LOG_AUDIT_DAO = AUDIT_LOG_SYNC + "AUDIT_DAO";


//    Packet
    public static final String PACKET_CREATION_EXP_CODE = "PCC-";
    public static final String PACKET_UPLOAD_EXP_CODE = "PAU-";
    public static final String REG_ACK_EXP_CODE = "ACK-";


    // ALert related constants
    public static final String ALERT_INFORMATION = "INFORMATION";
    public static final String ALERT_WARNING = "WARNING";
    public static final String ALERT = "ALERT";


    // Generic
    public static final String ERROR = "ERROR";

    // Audit Constants
    public static final String AUDIT_LOGS_DELETION_SUCESS_MSG = "AUDIT_LOGS_DELETION_SUCESS_MSG";
    public static final String AUDIT_LOGS_DELETION_FLR_MSG = "Audit Logs Deleted Failed";
    public static final String AUDIT_LOGS_DELETION_EMPTY_MSG = "AUDIT_LOGS_DELETION_EMPTY_MSG";


    //MultiThreading Config Params
    public static final Integer CORE_POOLING_SIZE = 50;
    public static final Integer MAX_POOLING_SIZE = 50;
    public static final Integer QUEUE_CAPACITY = 2000000;
    public static final String DEFAULT_PREFIX = "SBRESHNA-THREAD-SERVICE -> ";


}
