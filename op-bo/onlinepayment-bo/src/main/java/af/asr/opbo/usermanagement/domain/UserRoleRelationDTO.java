package af.asr.opbo.usermanagement.domain;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRoleRelationDTO {
    String userId;
    List<String> roles;
}
