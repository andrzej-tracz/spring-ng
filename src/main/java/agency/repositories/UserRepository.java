package agency.repositories;

import agency.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {

    public User findByUsername(String username);

    @Query("{'isActive': true }")
    public List<User> findActive();
}
