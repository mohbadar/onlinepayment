package af.gov.anar.service_kit.infrastructure;

public class ProductionReadyParams {

    //for production change it to "/**"
    public final static String[] API_RESOURCE_TO_SECURE = {"/api/**", "/migration/**"};
    public final static String[] API_RESOURCE_TO_ALLOW = {"/mobile-metering/**"};
//    public final static String[] API_RESOURCE_TO_SECURE = {"/migration/**"};

    //for production change it ot "normal", "random"
    public final static String ACCOUNT_NUMBER_GENERATION_TYPE ="random";


}
