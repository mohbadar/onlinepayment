package af.asr.opbo.usermanagement.domain;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginDTO {

    private String username;
    private String password;
}
