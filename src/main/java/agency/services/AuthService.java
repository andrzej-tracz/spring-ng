package agency.services;

import agency.security.contracts.Authenticable;
import agency.security.contracts.UserProviderInterface;
import agency.security.model.JwtUser;
import agency.services.security.Hash;
import agency.services.security.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpServletRequest;

@Service
public class AuthService {

    public static String USER_REQUEST_KEY = "AUTH_USER";

    @Autowired
    private UserProviderInterface userProvider;

    @Autowired
    private JWTService tokenService;

    @Autowired
    private Hash hash;

    public boolean authenticate(String userName, CharSequence password) {

        Authenticable user = this.userProvider.findUserByUsername(userName);

        return null != user && this.hash.matches(password, user.getPassword());
    }

    public Authenticable user(HttpServletRequest request) {
        JwtUser u = this.tokenService.resolveUser(request);

        return this.userProvider.findUserByUsername(u.getUsername());
    }
}
