package af.gov.anar.service_kit.usermanagement.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BankUserCreationDTO {

    private String username;
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private String role;
    private String bank;
    private String branch;
    private String counter;
    private String confirmPassword;
}
