package agency.repositories;

import java.util.List;
import agency.entity.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface CustomerRepository extends MongoRepository<Customer, String> {

    public Customer findByName(String firstName);

    public Customer findByEmail(String email);

    public List<Customer> findBySurname(String lastName);

    @Query("{'isActive': true }")
    public List<Customer> findActive();

    @Query(value = "{'isActive':true}", count = true)
    public int getActiveCustomerCount();

}
