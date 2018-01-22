package agency.config;

import agency.services.security.Hash;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class Services  {

    @Bean
    PasswordEncoder encoder() {
        return new BCryptPasswordEncoder(8);
    }

    @Bean
    Hash hash() {
        return new Hash();
    }
}
