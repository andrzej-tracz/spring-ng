package agency.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;

class AttributeValue {

    @NotNull @Setter @Getter
    private String name;

    @NotNull @Setter @Getter
    private double amount = (double) 0;

}

class ProductCategoryAttribute {

    @NotNull @Setter @Getter
    private String name;

    @NotNull @Setter @Getter
    private boolean shouldChangePrice;

    @Setter @Getter
    private ArrayList<AttributeValue> availableValues = new ArrayList<>();

}

@Document(collection = "product-categories")
@EnableMongoAuditing
public class ProductCategory {

    @Id @Getter
    private String id;

    @NotNull @Setter @Getter
    private String name;

    @Setter @Getter
    private ArrayList<ProductCategoryAttribute> attributes = new ArrayList<>();

    @CreatedDate
    @Setter @Getter
    private Date createdAt;

    @LastModifiedDate
    @Setter @Getter
    private Date updatedAt;

}
