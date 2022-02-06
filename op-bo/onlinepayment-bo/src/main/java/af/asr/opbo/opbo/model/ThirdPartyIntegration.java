package af.asr.opbo.opbo.model;

import af.asr.opbo.infrastructure.base.BaseEntity;
import af.asr.opbo.opbo.enums.CredentialPosition;
import af.asr.opbo.opbo.enums.AuthorizationType;
import af.asr.opbo.opbo.enums.DataExchangeProtocol;
import af.asr.opbo.opbo.enums.OAuth2GrantType;
import lombok.*;
import org.hibernate.annotations.Where;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table()
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Where(clause = "deleted is false")
public class ThirdPartyIntegration extends BaseEntity {

    @NotNull
    @Column(nullable = false)
    private String organizationId;

    @NotNull
    @Column(nullable = false)
    private String provinceId;

    @NotNull
    @Column(nullable = false, unique = true)
    private String name;
    @NotNull
    @Column(nullable = false, unique = true)
    private String code;

    @NotNull
    @Column(nullable = false)
    private String host;
    @NotNull
    @Column(nullable = false)
    private int port;
    @NotNull
    @Column(nullable = false)
    private String authUri;
    @NotNull
    @Column(nullable = false)
    private String authUriMethod;

    @NotNull
    @Column(nullable = false)
    private String billInfoInquiryUri;
    @NotNull
    @Column(nullable = false)
    private String billInfoInquiryUriMethod;

    @NotNull
    @Column(nullable = false)
    private String billAdviceMessageUri;
    @NotNull
    @Column(nullable = false)
    private String billAdviceMessageUriMethod;

    @NotNull
    @Column(nullable = false)
    private String username;
    @NotNull
    @Column(nullable = false)
    private String password;

    @Enumerated(value = EnumType.STRING)
    private AuthorizationType authorizationType;

    @NotNull
    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private CredentialPosition credentialPosition;

    @NotNull
    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private DataExchangeProtocol dataExchangeProtocol;



    // API KEY
    private String apiKey;
    private String apiValue;


    //OAuth 2
    @Enumerated(value = EnumType.STRING)
    private OAuth2GrantType oAuth2GrantType;
    private String clientId;
    private String clientSecret;

    @Column(nullable = false)
    private boolean enabled =true;



}
