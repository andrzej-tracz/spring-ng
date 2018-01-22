package agency.services;

import agency.entity.User;
import agency.repositories.UserRepository;
import agency.security.contracts.Authenticable;
import agency.security.contracts.UserProviderInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserProviderInterface {

    @Autowired
    private UserRepository repository;

    public User save(User user) {
        this.repository.save(user);

        return user;
    }

    @Override
    public Authenticable findUserByUsername(String username) {
        return repository.findByUsername(username);
    }
}
