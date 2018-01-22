package agency.services.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;

public class Hash {

    @Autowired
    private PasswordEncoder encoder;

    public String encode(CharSequence password) {

        return encoder.encode(password);
    }

    public boolean matches(CharSequence password, String hash) {

        if (StringUtils.isEmpty(password) || StringUtils.isEmpty(hash)) {
            throw new IllegalArgumentException("Password and hash are required.");
        }

        return encoder.matches(password, hash);
    }
}
