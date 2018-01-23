package agency.repositories;

import agency.entity.ProductCategory;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface ProductCategoryRepository extends MongoRepository<ProductCategory, String> {
    //
}
