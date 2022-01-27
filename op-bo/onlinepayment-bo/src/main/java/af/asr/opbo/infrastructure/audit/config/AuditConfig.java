package af.asr.opbo.infrastructure.audit.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * The configuration class for Audit having package location to scan
 */
@Configuration
public class AuditConfig {

	/**
	 * Creates a new Modelmapper bean
	 * 
	 * @return The {@link ModelMapper}
	 */
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}


}
