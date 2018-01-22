package agency.http.filters;

import agency.security.contracts.Authenticable;
import agency.security.contracts.UserProviderInterface;
import org.springframework.beans.factory.annotation.Autowired;
import agency.security.model.JwtUser;
import agency.services.security.JWTService;
import io.jsonwebtoken.JwtException;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static agency.services.AuthService.USER_REQUEST_KEY;

public class JwtFilter implements Filter {

    @Autowired
    private JWTService tokenService;

    @Autowired
    private UserProviderInterface userProvider;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void destroy() {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain
    ) throws IOException, ServletException {

        final HttpServletRequest httpRequest = (HttpServletRequest) request;
        final HttpServletResponse httpResponse = (HttpServletResponse) response;

        httpResponse.addHeader("Access-Control-Allow-Origin", "*");
        httpResponse.addHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Request-With, Accept");
        httpResponse.addHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH");

        String uri = httpRequest.getRequestURI();

        if (uri.equals("/api/login")) {
            chain.doFilter(httpRequest, httpResponse);
            return;
        }

        try {
            JwtUser jwtUser = this.tokenService.resolveUser(httpRequest);
            Authenticable user = this.userProvider.findUserByUsername(jwtUser.getUsername());

            if (null == user) {
                httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            request.setAttribute(USER_REQUEST_KEY, user);

        } catch (JwtException e) {
            httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        chain.doFilter(httpRequest, httpResponse);
    }
}
