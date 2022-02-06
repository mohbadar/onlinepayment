package af.asr.opbo.opbo.onlinecollection;

import af.asr.opbo.opbo.model.ThirdPartyIntegration;
import af.asr.opbo.opbo.onlinecollection.keycloack.Credential;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;

@Service
public class ApiClientService {

    @Autowired
    private RestTemplate restTemplate;

    public String getBillInfoWithNoAuth(ThirdPartyIntegration integration, String billNo) {

        String url = String.format("http://%s:%d%s/%s",
                integration.getHost(),
                integration.getPort(),
                integration.getBillInfoInquiryUri(),
                billNo
        );
        HttpEntity<String> payloadEntity = new HttpEntity<String>(billNo,
                this.getHeaders());

        ResponseEntity<String> response =  restTemplate.exchange(url,
                integration.getBillInfoInquiryUriMethod().equalsIgnoreCase("GET")? HttpMethod.GET : HttpMethod.POST,
                null, String.class);

        return response.getBody();
    }


    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        return headers;
    }

    private String getBody(final Credential user) throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(user);
    }

    public String getBillInfoWithBasicAuth(ThirdPartyIntegration integration, String billNo) {

        String url = String.format("http://%s:%d%s/%s",
                integration.getHost(),
                integration.getPort(),
                integration.getBillInfoInquiryUri(),
                billNo
        );

        HttpHeaders headers= this.getHeaders();
        headers.set("username", integration.getUsername());
        headers.set("password", integration.getPassword());

//        HttpEntity<String> payloadEntity = new HttpEntity<String>(null,
//                this.getHeaders());

        RequestEntity<Void> request = RequestEntity.get(URI.create(url))
                           .headers(headers)
                .build();

        ResponseEntity<String> response =  restTemplate.exchange(request,String.class);

        return response.getBody();
    }
}
