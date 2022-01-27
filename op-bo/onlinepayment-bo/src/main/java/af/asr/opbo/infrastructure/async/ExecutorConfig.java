package af.asr.opbo.infrastructure.async;

import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.AsyncConfigurerSupport;

import java.util.concurrent.Executor;

//@Configuration
public class ExecutorConfig extends AsyncConfigurerSupport {
    @Override
    @Bean
    public Executor getAsyncExecutor() {
        return new ContextAwarePoolExecutor();
    }
}