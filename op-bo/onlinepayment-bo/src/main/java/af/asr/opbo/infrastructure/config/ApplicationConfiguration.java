package af.asr.opbo.infrastructure.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@Component
@Primary
public class ApplicationConfiguration {


    @Value("${keycloak.auth-server-url}")
    private String keycloakServerUrl;

    @Value("${keycloak.realm}")
    private String keycloackRealm;

    @Value("${admin.user}")
    private String keycloackUser;

    @Value("${admin.password}")
    private String keycloackPassword;

//    @Bean
//    public Keycloak getUsers() {
//        Keycloak keycloak = Keycloak.getInstance(keycloakServerUrl, keycloackRealm, keycloackUser, keycloackPassword,
//                "admin-cli");
//        return keycloak;
//    }

    @PostConstruct
    public void init(){
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));   // It will set UTC timezone
    }

    @Bean
    public RestTemplate getRestTemplate()
    {
        return new RestTemplate();

    }

}
