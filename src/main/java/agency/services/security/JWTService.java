package agency.services.security;

import agency.security.model.JwtUser;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class JWTService {

    @Value("${auth.jwt.expire_hours}")
    private Long expireHours;

    @Value("${auth.jwt.secret}")
    private String plainSecret;

    @Value("${auth.jwt.header}")
    private String authHeader;

    private String encodedSecret;

    @PostConstruct
    protected void init() {
        this.encodedSecret = generateEncodedSecret(this.plainSecret);
    }

    private String generateEncodedSecret(String plainSecret) {
        if (StringUtils.isEmpty(plainSecret)) {
            throw new IllegalArgumentException("JWT secret cannot be null or empty.");
        }
        return Base64
                .getEncoder()
                .encodeToString(this.plainSecret.getBytes());
    }

    private Date getExpirationTime() {
        Date now = new Date();
        Long expireInMillis = TimeUnit.HOURS.toMillis(expireHours);
        return new Date(expireInMillis + now.getTime());
    }

    private JwtUser getUser(String encodedSecret, String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(encodedSecret)
                .parseClaimsJws(token)
                .getBody();

        String username = claims.getSubject();
        JwtUser securityUser = new JwtUser();

        securityUser.setUsername(username);

        return securityUser;
    }

    private JwtUser getUser(String token) {
        return getUser(this.encodedSecret, token);
    }

    private String getToken(String encodedSecret, JwtUser jwtUser) {
        Date now = new Date();
        return Jwts.builder()
                .setId(UUID.randomUUID().toString())
                .setSubject(jwtUser.getUsername())
                .setIssuedAt(now)
                .setExpiration(getExpirationTime())
                .signWith(SignatureAlgorithm.HS512, encodedSecret)
                .compact();
    }

    public String getToken(JwtUser jwtUser) {
        return getToken(this.encodedSecret, jwtUser);
    }


    public JwtUser resolveUser(HttpServletRequest request) throws JwtException {

        String authHeaderVal = request.getHeader(authHeader);

        if (StringUtils.isEmpty(authHeaderVal)) {
            throw new JwtException("Unauthorized. Token is missing.");
        }

        authHeaderVal = authHeaderVal.substring(7); // Skip 'Bearer '

        return this.getUser(authHeaderVal);
    }
}