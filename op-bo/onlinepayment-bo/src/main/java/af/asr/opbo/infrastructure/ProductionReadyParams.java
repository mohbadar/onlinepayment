package af.asr.opbo.infrastructure;

public class ProductionReadyParams {

    //for production change it to "/**"
    public final static String[] API_RESOURCE_TO_SECURE = {"/api/**"};
    public final static String[] API_RESOURCE_TO_ALLOW = {"/public/**"};
//    public final static String[] API_RESOURCE_TO_SECURE = {"/migration/**"};

    //for production change it ot "normal", "random"
    public final static String ACCOUNT_NUMBER_GENERATION_TYPE ="random";


}
