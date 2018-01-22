package agency.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Email;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Document(collection = "owners")
@EnableMongoAuditing
public class Owner {

    @Id @Getter @Setter
    private String id;

    @NotNull @Setter @Getter
    private String name;

    @NotNull @Setter @Getter
    private String surname;

    @Setter @Getter
    private String address;

    @Setter @Getter
    private String city;

    @Setter @Getter
    private String companyName;

    @Setter @Getter
    private String vatNumber;

    @Setter @Getter
    @NotNull @Email @Indexed(unique = true)
    private String email;

    @Setter @Getter
    private String phone;

    @CreatedDate
    @Setter @Getter
    private Date createdAt;

    @LastModifiedDate
    @Setter @Getter
    private Date updatedAt;
}
