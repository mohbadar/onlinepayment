package af.gov.anar.service_kit;

import af.gov.anar.core.applicationname.EnableApplicationName;
import it.ozimov.springboot.mail.configuration.EnableEmailTools;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.envers.repository.support.EnversRevisionRepositoryFactoryBean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableApplicationName
@ComponentScan(basePackages = {"af.*", "af.gov.anar.service_kit.*"})
@EnableJpaRepositories(basePackages = {"af.*"}, repositoryFactoryBeanClass = EnversRevisionRepositoryFactoryBean.class)
@EntityScan(basePackages = {"af.*"})
@EnableSwagger2
@EnableAspectJAutoProxy(proxyTargetClass = true)
@EnableAsync
@EnableRetry
@EnableScheduling
@EnableTransactionManagement
@EnableEmailTools
@EnableJpaAuditing(auditorAwareRef = "auditorAwareImpl")
public class Application extends SpringBootServletInitializer{
        public static void main(String[] args) {
                ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);
        }
}
