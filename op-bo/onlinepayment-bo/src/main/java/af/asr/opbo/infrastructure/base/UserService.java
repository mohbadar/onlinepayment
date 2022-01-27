package af.asr.opbo.infrastructure.base;

import af.asr.opbo.usermanagement.service.UserManagementService;
import org.apache.commons.lang.StringUtils;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.AccessToken;
import org.keycloak.representations.idm.UserRepresentation;
import org.keycloak.representations.idm.authorization.Permission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;

import java.util.List;
import java.util.stream.Collectors;

@Service
//@Scope(value = "singleton")
public class UserService {

    @Autowired
    private KeycloakSecurityContext keycloakSecurityContext;

    @Autowired
    public AccessToken accessToken;

    @Autowired
    private UserManagementService userManagementService;

    @Value("${keycloak.auth-server-url}")
    private String keycloakServerUrl;

    @Value("${keycloak.realm}")
    private String keycloackRealm;

    @Value("${admin.user}")
    private String keycloackUser;

    @Value("${admin.password}")
    private String keycloackPassword;

    public List getUsers() {
        Keycloak keycloak = Keycloak.getInstance(keycloakServerUrl, keycloackRealm, keycloackUser, keycloackPassword,
                "admin-cli");
        List<UserRepresentation> results = keycloak.realm(keycloackRealm).users().search(null, 0, Integer.MAX_VALUE);
        return results;
    }

    public String getId() {
//        return accessToken.getId();
        UserRepresentation userRepresentation = userManagementService.getUserByUserName(this.getPreferredUsername());
        return userRepresentation !=null ? userRepresentation.getId() : null;
    }

    public String getPreferredUsername() {
        if (RequestContextHolder.getRequestAttributes() != null){
            return StringUtils.isNotBlank( accessToken.getPreferredUsername()) ? accessToken.getPreferredUsername() : "SYSTEM";
        }
        return "SYSTEM";
    }

    public String getName() {
        return accessToken.getName();
    }

    public String getFamilyName() {
        return accessToken.getFamilyName();
    }

    public String getGivenName() {
        return accessToken.getGivenName();
    }

    public String getDoB() {
        return accessToken.getBirthdate();
    }

    public String getEmail() {
        return accessToken.getEmail();
    }

    public boolean getPhoneNumberVerified() {
        return accessToken.getPhoneNumberVerified();
    }

    public boolean getEmailVerified() {
        return accessToken.getEmailVerified();
    }

    public String getAcr() {
        return accessToken.getAcr();
    }

    public String getProfile() {
        return accessToken.getProfile();
    }

    public String getIssuer() {
        return accessToken.getIssuer();
    }

    public String getType() {
        return accessToken.getType();
    }

    public String getLocale() {
        return accessToken.getLocale();
    }

    public String getScope() {
        return accessToken.getScope();
    }

    public String getPhoneNumber() {
        return accessToken.getPhoneNumber();
    }

    public boolean hasPermission(String perm)
    {
        List<String> permissions =  accessToken.getAuthorization().getPermissions().stream()
                .map(Permission::getResourceName).collect(Collectors.toList());
        return permissions.contains(perm);
    }

    public boolean hasRole(String role)
    {
        return accessToken.getRealmAccess().getRoles().contains(role);
    }
}
