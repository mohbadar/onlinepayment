package af.gov.anar.service_kit.infrastructure;

import af.gov.anar.service_kit.infrastructure.base.LoginAttemptService;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.adapters.springsecurity.KeycloakConfiguration;
import org.keycloak.adapters.springsecurity.authentication.KeycloakAuthenticationProvider;
import org.keycloak.adapters.springsecurity.config.KeycloakWebSecurityConfigurerAdapter;
import org.keycloak.adapters.springsecurity.filter.KeycloakAuthenticationProcessingFilter;
import org.keycloak.adapters.springsecurity.filter.KeycloakPreAuthActionsFilter;
import org.keycloak.adapters.springsecurity.management.HttpSessionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.method.MethodSecurityMetadataSource;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.session.RegisterSessionAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.util.CollectionUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.util.Collection;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@KeycloakConfiguration
@ConditionalOnWebApplication
@ConditionalOnProperty(value = "keycloak.enabled", matchIfMissing = true)
@ConditionalOnClass(KeycloakWebSecurityConfigurerAdapter.class)
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Slf4j
public class SpringSecurity extends KeycloakWebSecurityConfigurerAdapter implements ApplicationListener<AuthenticationFailureBadCredentialsEvent> {

    @Autowired
    private RequestMappingHandlerMapping requestMappingHandlerMapping;

    @Autowired
    private MethodSecurityMetadataSource methodSecurityMetadataSource;

    @Autowired
    private LoginAttemptService loginAttemptService;


    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) {
        SimpleAuthorityMapper grantedAuthorityMapper = new SimpleAuthorityMapper();
        grantedAuthorityMapper.setPrefix("");
        KeycloakAuthenticationProvider keycloakAuthenticationProvider = keycloakAuthenticationProvider();
        keycloakAuthenticationProvider.setGrantedAuthoritiesMapper(grantedAuthorityMapper);
        auth.authenticationProvider(keycloakAuthenticationProvider);
    }

    @Override
    public void onApplicationEvent(AuthenticationFailureBadCredentialsEvent event) {
        WebAuthenticationDetails details = (WebAuthenticationDetails) event.getAuthentication().getDetails();
        loginAttemptService.loginFailed(details.getRemoteAddress());
    }

    @Bean
    @Override
    protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
        return new RegisterSessionAuthenticationStrategy(new SessionRegistryImpl());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//         super.configure( http );
//         http
//         .csrf().disable()
//         .sessionManagement()
//         .sessionCreationPolicy( SessionCreationPolicy.STATELESS )
//         .and()
//         .requestMatchers()
//         .and()
//         .authorizeRequests()
//         .antMatchers(ProductionReadyParams.API_RESOURCE_TO_SECURE).permitAll() // <- public endpoint
//         .anyRequest()
//         .authenticated();

        super.configure(http);
        http.csrf().disable();

                 http.sessionManagement().
                 sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                 .sessionAuthenticationStrategy(sessionAuthenticationStrategy())
                 .and()

                .authorizeRequests()
                         .antMatchers(ProductionReadyParams.API_RESOURCE_TO_ALLOW).permitAll()
//                         .mvcMatchers(ProductionReadyParams.API_RESOURCE_TO_SECURE)
//                         .authenticated()
                         .anyRequest().authenticated();
    }

    @Bean
    @Override
    @ConditionalOnMissingBean(HttpSessionManager.class)
    protected HttpSessionManager httpSessionManager() {
        return new HttpSessionManager();
    }

    @Bean
    public FilterRegistrationBean keycloakAuthenticationProcessingFilterRegistrationBean(
            KeycloakAuthenticationProcessingFilter filter) {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean(filter);
        registrationBean.setEnabled(false);
        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean keycloakPreAuthActionsFilterRegistrationBean(KeycloakPreAuthActionsFilter filter) {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean(filter);
        registrationBean.setEnabled(false);
        return registrationBean;
    }

    @Bean
    public GrantedAuthoritiesMapper grantedAuthoritiesMapper() {
        SimpleAuthorityMapper mapper = new SimpleAuthorityMapper();
        mapper.setConvertToUpperCase(true);
        return mapper;
    }

    // @Override
    // protected void configure(final HttpSecurity http) throws Exception
    // {
    //
    // super.configure(http);
    // http.sessionManagement().
    // sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    // .sessionAuthenticationStrategy(sessionAuthenticationStrategy())
    // .and()
    // .addFilterBefore(keycloakPreAuthActionsFilter(), LogoutFilter.class)
    // .addFilterBefore(keycloakAuthenticationProcessingFilter(),
    // X509AuthenticationFilter.class)
    // .exceptionHandling()
    // .authenticationEntryPoint(authenticationEntryPoint())
    // .and()
    // .authorizeRequests()
    // .requestMatchers(CorsUtils::isCorsRequest).permitAll()
    // .antMatchers(urlPath()).authenticated() .anyRequest().permitAll();
    // }

    private String[] urlPath() {
        Set<String> antMatchers = new HashSet<>();
        Map<RequestMappingInfo, HandlerMethod> map = this.requestMappingHandlerMapping.getHandlerMethods();
        map.forEach((requestMappingInfo, handlerMethod) -> {
            Collection<ConfigAttribute> collection = methodSecurityMetadataSource
                    .getAttributes(handlerMethod.getMethod(), handlerMethod.getBeanType());
            if (!CollectionUtils.isEmpty(collection)) {
                antMatchers.addAll(requestMappingInfo.getPatternsCondition().getPatterns());
            }

        });
        return antMatchers.toArray(new String[] {});
    }
}
