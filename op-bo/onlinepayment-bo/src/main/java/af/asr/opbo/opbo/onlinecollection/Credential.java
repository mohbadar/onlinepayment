package af.asr.opbo.opbo.onlinecollection;

import lombok.Data;

@Data
public class Credential {
    private String username;
    private String password;
    private String grant_type;
    private String client_id;
    private String client_secret;
}
