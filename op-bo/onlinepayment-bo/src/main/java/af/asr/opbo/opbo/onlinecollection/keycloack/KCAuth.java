package af.asr.opbo.opbo.onlinecollection.keycloack;

import af.gov.anar.core.infrastructure.exception.common.IOException;
import af.gov.anar.lib.json.JsonUtility;
import af.gov.anar.lib.json.exception.JsonMappingException;
import af.gov.anar.lib.json.exception.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class KCAuth {

    @Autowired
    private RestTemplate restTemplate;

    private static final String username="superuser";
    private static final String password="secret";
    private static final String kcConfigUrl="http://localhost:8080/auth/realms/onlinepayment/.well-known/openid-configuration";

    private String authServerUrl="http://localhost:8080/auth";
    private String realm="onlinepayment";
    private String clientId="op";
    private String tokenEndpoint ="";
    private String grantType="password";

//    public KCAuth(private )

    public String getAccessToken() throws JsonProcessingException, JsonParseException, IOException, JsonMappingException, af.gov.anar.lib.json.exception.JsonProcessingException {
        Credential credential= new Credential();
        credential.setUsername(username);
        credential.setPassword(password);
        credential.setClient_id(clientId);
        credential.setGrant_type(grantType);
        credential.setClient_secret(password);

        String payload = this.getBody(credential);

        String data= "{\n" +
                "            \"username\": \"superuser\",\n" +
                "            \"password\": \"secret\",\n" +
                "            \"grant_type\": \"password\",\n" +
                "            \"client_id\": \"op\"\n" +
                "        }";


        JsonNode node = new ObjectMapper().readTree(data);


        HttpEntity<JsonNode> payloadEntity = new HttpEntity<JsonNode>(node,
                this.getHeaders());


        String tokenUrl = this.getOrRequestTokenEndPoint();
        ResponseEntity<String> token =  restTemplate.exchange(tokenUrl,HttpMethod.POST, payloadEntity, String.class);

        return token.getBody();
    }

    private String getOrRequestTokenEndPoint() throws JsonParseException, IOException, JsonMappingException {
        if(tokenEndpoint.length() < 10){
            ResponseEntity<String> configs =  restTemplate.exchange(kcConfigUrl,
                    HttpMethod.GET, null, String.class);
            String body = configs.getBody();
//            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> map = JsonUtility.jsonStringToJavaMap(body);
//            JSONObject root = JSONObject.stringToValue(body);

            return map.get("token_endpoint").toString();
        }

        return "";
    }

    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("grant_type", "password");
        return headers;
    }

    private String getBody(final Credential user) throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(user);
    }
}

