package agency.entity;

import agency.security.contracts.Authenticable;
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

@Document(collection = "users")
@EnableMongoAuditing
public class User implements Authenticable {

    @Id
    @Getter
    private String id;

    @Setter @Getter
    @NotNull @Indexed(unique = true)
    private String username;

    @Setter @Getter
    private String name;

    @Setter @Getter
    private String surname;

    @Getter @Setter
    private String password;

    @Setter @Getter
    @NotNull @Email @Indexed(unique = true)
    private String email;

    @Setter @Getter
    private Boolean isActive;

    @CreatedDate
    @Setter @Getter
    private Date createdAt;

    @LastModifiedDate
    @Setter @Getter
    private Date updatedAt;
}