package agency.security.contracts;

public interface UserProviderInterface {

    public Authenticable findUserByUsername(String username);
}
