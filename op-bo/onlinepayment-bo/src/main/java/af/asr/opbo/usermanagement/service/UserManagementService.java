package af.asr.opbo.usermanagement.service;

import af.asr.opbo.infrastructure.base.UserService;
import af.asr.opbo.usermanagement.domain.LoginDTO;
import af.asr.opbo.usermanagement.domain.UserDTO;
import af.asr.opbo.usermanagement.domain.UserRoleRelationDTO;
import org.apache.commons.lang.StringUtils;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.*;
import org.keycloak.authorization.client.AuthzClient;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class UserManagementService {

    @Autowired
    private KeycloakSecurityContext keycloakSecurityContext;

    @Autowired
    private UserService userService;

    @Value("${keycloak.auth-server-url}")
    private String keycloakServerUrl;

    @Value("${keycloak.realm}")
    private String keycloackRealm;

    @Value("${keycloak.resource}")
    private String keycloakClientId;

    @Value("${admin.user}")
    private String keycloackUser;

    @Value("${admin.password}")
    private String keycloackPassword;



    //@PreAuthorize("hasAuthority('configuration_general_usermanagement')")
    public List<UserRepresentation> registerNewUser(UserDTO dto) {
        Keycloak keycloak = Keycloak.getInstance(keycloakServerUrl, keycloackRealm, keycloackUser, keycloackPassword,
                "admin-cli");

        RealmResource realm = keycloak.realm(keycloackRealm);
        UsersResource users = realm.users();
        UserRepresentation user = createUser(dto);
        users.create(user);
        //System.out.println("*********************user list***************************** ");
        List<UserRepresentation> userList = users.list();
        //System.out.println(userList);
        //System.out.println("************************************************** ");
        return userList;
    }

    //@PreAuthorize("hasAuthority('configuration_general_usermanagement')")
    public UserRepresentation assignUserRole(UserRoleRelationDTO dto) {
        Keycloak keycloak = Keycloak.getInstance(keycloakServerUrl, keycloackRealm, keycloackUser, keycloackPassword,
                "admin-cli");

        RealmResource realm = keycloak.realm(keycloackRealm);
        UserResource userResource = realm.users().get(dto.getUserId());
        UserRepresentation user = userResource.toRepresentation();
        List<RoleRepresentation> rolesToAdd = new ArrayList<RoleRepresentation>();
        for (String role : dto.getRoles()) {
            rolesToAdd.add(realm.roles().get(role).toRepresentation());
        }
        userResource.roles().realmLevel().add(rolesToAdd);

        return user;
    }

    //@PreAuthorize("hasAuthority('configuration_general_usermanagement')")
    public UsersResource getUsers() {
        Keycloak keycloak = Keycloak.getInstance(keycloakServerUrl, keycloackRealm, keycloackUser, keycloackPassword,
                "admin-cli");

        RealmResource realm = keycloak.realm(keycloackRealm);
        UsersResource users = realm.users();
        return users;
    }

    //@PreAuthorize("hasAuthority('configuration_general_usermanagement')")
    public UserResource getUserById(String id) {
        Keycloak keycloak = Keycloak.getInstance(keycloakServerUrl, keycloackRealm, keycloackUser, keycloackPassword,
                "admin-cli");

        RealmResource realm = keycloak.realm(keycloackRealm);
        return realm.users().get(id);
    }

    //@PreAuthorize("hasAuthority('configuration_general_usermanagement')")
    public UserRepresentation getUserByUserName(String userName) {
        Keycloak keycloak = Keycloak.getInstance(keycloakServerUrl, keycloackRealm, keycloackUser, keycloackPassword,
                "admin-cli");

        RealmResource realm = keycloak.realm(keycloackRealm);
        
        List<UserRepresentation> userList = realm.users().list();
        
        UserRepresentation user = null;

        for(UserRepresentation userRepresentation: userList){
            if(userRepresentation.getUsername().equals(userName)){
                return userRepresentation;
            }
        }

        return user;
    }

    //@PreAuthorize("hasAuthority('configuration_general_usermanagement')")
    private UserRepresentation createUser(UserDTO dto) {
        UserRepresentation user = new UserRepresentation();
        user.setEmail(dto.getEmail());
        user.setFirstName(dto.getFirstname());
        user.setLastName(dto.getLastname());
        user.setEnabled(true);
        user.setUsername(dto.getUsername());
        user.setCredentials(Collections.singletonList(createCredential(dto.getPassword())));
        return user;
    }

    //@PreAuthorize("hasAuthority('configuration_general_usermanagement')")
    private CredentialRepresentation createCredential(String password) {
        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
        credentialRepresentation.setValue(password);
        return credentialRepresentation;
    }

    //@PreAuthorize("hasAuthority('configuration_general_usermanagement')")
    public RolesResource getRoles() {
        Keycloak keycloak = Keycloak.getInstance(keycloakServerUrl, keycloackRealm, keycloackUser, keycloackPassword,
                "admin-cli");
        RealmResource realmResource = keycloak.realm(keycloackRealm);
        return realmResource.roles();
    }

    //@PreAuthorize("hasAuthority('configuration_general_usermanagement')")
    public List<RoleRepresentation> getUserRoleById(String id) {
        Keycloak keycloak = Keycloak.getInstance(keycloakServerUrl, keycloackRealm, keycloackUser, keycloackPassword,
                "admin-cli");
        RealmResource realm = keycloak.realm(keycloackRealm);
        UserResource userResource = realm.users().get(id);
        List<RoleRepresentation> roleRepresentationList = userResource.roles().realmLevel().listEffective();
        return roleRepresentationList;
    }

    //@PreAuthorize("hasAuthority('configuration_general_usermanagement')")
    public RoleResource getRoleById(String id) {
        Keycloak keycloak = Keycloak.getInstance(keycloakServerUrl, keycloackRealm, keycloackUser, keycloackPassword,
                "admin-cli");
        RealmResource realm = keycloak.realm(keycloackRealm);
        return realm.roles().get(id);
    }

    //@PreAuthorize("hasAuthority('configuration_general_usermanagement')")
    public GroupsResource getGroups() {
        Keycloak keycloak = Keycloak.getInstance(keycloakServerUrl, keycloackRealm, keycloackUser, keycloackPassword,
                "admin-cli");
        RealmResource realmResource = keycloak.realm(keycloackRealm);
        return realmResource.groups();
    }

    //@PreAuthorize("hasAuthority('configuration_general_usermanagement')")
    public GroupResource getGroupById(String id) {
        Keycloak keycloak = Keycloak.getInstance(keycloakServerUrl, keycloackRealm, keycloackUser, keycloackPassword,
                "admin-cli");
        RealmResource realm = keycloak.realm(keycloackRealm);
        return realm.groups().group(id);
    }

    //@PreAuthorize("hasAuthority('configuration_general_usermanagement')")
    public KeyResource getKeys() {
        Keycloak keycloak = Keycloak.getInstance(keycloakServerUrl, keycloackRealm, keycloackUser, keycloackPassword,
                "admin-cli");
        RealmResource realmResource = keycloak.realm(keycloackRealm);
        return realmResource.keys();
    }

    //@PreAuthorize("hasAuthority('configuration_general_usermanagement')")
    public ClientsResource getClients() {
        Keycloak keycloak = Keycloak.getInstance(keycloakServerUrl, keycloackRealm, keycloackUser, keycloackPassword,
                "admin-cli");
        RealmResource realmResource = keycloak.realm(keycloackRealm);
        return realmResource.clients();
    }

    //@PreAuthorize("hasAuthority('configuration_general_usermanagement')")
    public void logoutAll() {
        Keycloak keycloak = Keycloak.getInstance(keycloakServerUrl, keycloackRealm, keycloackUser, keycloackPassword,
                "admin-cli");
        RealmResource realmResource = keycloak.realm(keycloackRealm);
        realmResource.logoutAll();
    }

    //@PreAuthorize("hasAuthority('configuration_general_usermanagement')")
    public AccessTokenResponse authenticate(LoginDTO dto)
    {
        // create a new instance based on the configuration defined in keycloak-authz.json
        AuthzClient authzClient = AuthzClient.create();

        // send the authorization request to the server in order to
            // obtain an access token granted to the user
        AccessTokenResponse response = authzClient.obtainAccessToken(dto.getUsername(), dto.getPassword());

        return response;
    }

    public boolean canMigrate(String username, String password)
    {
//        try {
//            Keycloak keycloak = Keycloak.getInstance(keycloakServerUrl, keycloackRealm, username, password,
//                    "admin-cli");
//            RealmResource realm = keycloak.realm(keycloackRealm);
//            if (realm.roles().list().size() > 0) return true;
//        }catch (Exception e){
//            return false;
//        }
//        return false;
        if(StringUtils.isNotBlank(userService.getPreferredUsername()))
            return true;
        return false;
    }

 }
