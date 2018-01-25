package agency.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

enum PolicyStatus {
    DRAFT,
    CLOSED
}

class PolicyAttribute {

    @NotNull @Getter @Setter
    private String name;

    @NotNull @Getter @Setter
    private String label;

    @NotNull @Getter @Setter
    private double amount;

    @NotNull @Getter @Setter
    private boolean shouldChangePrice;
}

@Document(collection = "policies")
@EnableMongoAuditing
public class Policy {

    @Id @Getter
    private String id;

    @Setter @Getter
    private String filename;

    @Getter
    private Boolean hasFile = false;

    @NotNull @Setter @Getter
    private String name;

    @NotNull @Setter @Getter
    private String subject;

    @Setter @Getter
    private String subjectInfo;

    @Setter @Getter
    private String subjectDetails;

    @Setter @Getter
    private String description;

    @DBRef @Setter @Getter
    private User user;

    @DBRef @Setter @Getter @NotNull
    private Customer customer;

    @DBRef @Setter @Getter @NotNull
    private Product product;

    @Setter @Getter @NotNull
    private ProductVariant productVariant;

    @Setter @Getter
    private ArrayList<PolicyAttribute> assignedAttributes = new ArrayList<>();

    @NotNull @Setter @Getter
    private double price;

    @Setter @Getter @NotNull
    private PolicyStatus status = PolicyStatus.DRAFT;

    @CreatedDate
    @Setter @Getter
    private Date createdAt;

    @LastModifiedDate
    @Setter @Getter
    private Date updatedAt;

    @Setter @Getter
    private Date startsAt;

    @Setter @Getter @Future
    private Date endsAt;

    @Setter @Getter
    private Date closedAt;

    public Policy markAsClosed() {
        this.setClosedAt(new Date());
        this.setStatus(PolicyStatus.CLOSED);

        return this;
    }

    public boolean isDraft() {
        return this.status == PolicyStatus.DRAFT;
    }

    public boolean isClosed() {
        return this.status == PolicyStatus.CLOSED;
    }

    public String getStartAtFormated() {
        return getFormatedDate(this.startsAt);
    }

    public String getClosedAtFormated() {
        return getFormatedDate(this.closedAt);
    }

    public String getEndsAtFormated() {
        return getFormatedDate(this.endsAt);
    }

    String getFormatedDate(Date date) {

        if (null == date) {
            return "";
        }

        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");

        return format.format(date);
    }

    public boolean hasGeneratedFile() {

        File f = new File("storage/policies/" + this.filename);

        if(f.exists() && !f.isDirectory()) {
            return true;
        }

        return false;
    }

    public void checkGeneratedFile() {
        this.hasFile = this.hasGeneratedFile();
    }
}
