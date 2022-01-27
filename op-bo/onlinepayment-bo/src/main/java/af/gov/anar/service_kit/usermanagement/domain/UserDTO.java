package af.gov.anar.service_kit.usermanagement.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    String username;
    String email;
    String password;
    String currentPassword;
    String firstname;
    String lastname;
    String roleId;
}
