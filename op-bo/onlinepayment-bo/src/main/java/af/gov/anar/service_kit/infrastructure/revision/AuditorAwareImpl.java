package af.gov.anar.service_kit.infrastructure.revision;

import af.gov.anar.service_kit.infrastructure.base.UserService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AuditorAwareImpl implements AuditorAware<String> {

//    @Autowired
    private UserService userService;

    @Override
    public Optional<String> getCurrentAuditor() {
        if(userService != null || userService.accessToken != null)
             return Optional.of(
                     StringUtils.isNotBlank(userService.getPreferredUsername())
                             ? userService.getPreferredUsername()
                             : "SYSTEM");
        else
            return Optional.of("SYSTEM");
    }

    @Autowired
    public void setUserService(UserService userService)
    {
        this.userService = userService;
    }
}