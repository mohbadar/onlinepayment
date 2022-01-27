package af.asr.opbo.infrastructure.config;

import af.asr.opbo.infrastructure.constant.ApplicationGenericConstants;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.Executor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
@Primary
public class MultiThreadConfig {

    @Bean
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(ApplicationGenericConstants.CORE_POOLING_SIZE);
        executor.setMaxPoolSize(ApplicationGenericConstants.MAX_POOLING_SIZE);
        executor.setQueueCapacity(ApplicationGenericConstants.QUEUE_CAPACITY);
        executor.setThreadNamePrefix(ApplicationGenericConstants.DEFAULT_PREFIX);
        executor.initialize();
        return executor;
    }



}
