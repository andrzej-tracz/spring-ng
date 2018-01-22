package agency.repositories;

import agency.entity.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {

    @Query("{'isActive': true }")
    public List<Product> findActive();

    @Query(value = "{'isActive': true }", count = true)
    public int getActiveProductsCount();
}
