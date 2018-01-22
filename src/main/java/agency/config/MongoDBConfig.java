package agency.config;

import agency.entity.Policy;
import agency.entity.listeners.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MongoDBConfig {

    @Bean
    public UserListener userListener() {
        return new UserListener();
    }

    @Bean
    public CustomerListener customerListener() {
        return new CustomerListener();
    }

    @Bean
    public ProductListener productListener() {
        return new ProductListener();
    }

    @Bean
    public PolicyListener policyListener() {
        return new PolicyListener();
    }

    @Bean
    public OwnerListener ownerListener() {
        return new OwnerListener();
    }
}
