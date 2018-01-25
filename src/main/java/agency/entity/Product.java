package agency.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;

class ProductVariant {
    @Getter @Setter @NotNull
    private String name;

    @Getter @Setter @NotNull
    private Double price;
}

@Document(collection = "products")
@EnableMongoAuditing
public class Product {

    @Id @Getter
    private String id;

    @NotNull @Setter @Getter
    private String name;

    @NotNull @Setter @Getter
    private String description;

    @Setter @Getter
    private ArrayList<ProductVariant> variants = new ArrayList<>();

    @DBRef @NotNull @Setter @Getter
    private ProductCategory category;

    @Setter @Getter
    private Boolean isActive;

    @CreatedDate
    @Setter @Getter
    private Date createdAt;

    @LastModifiedDate
    @Setter @Getter
    private Date updatedAt;
}
