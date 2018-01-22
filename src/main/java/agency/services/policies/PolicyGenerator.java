package agency.services.policies;

import agency.entity.Owner;
import agency.entity.Policy;
import agency.exceptions.LogicException;
import agency.repositories.PoliciesRepository;
import com.github.jhonnymertz.wkhtmltopdf.wrapper.Pdf;
import lombok.Getter;
import lombok.Setter;
import org.jtwig.JtwigModel;
import org.jtwig.JtwigTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
class PolicyGenerator {

    @Setter @Getter
    private Policy policy;

    @Setter @Getter
    private Owner owner;

    @Autowired
    private PoliciesRepository policiesRepository;

    class ThreadGenerator extends Thread {

        public void run() {

            JtwigTemplate template = JtwigTemplate.classpathTemplate("templates/policies/index.twig");
            JtwigModel model = JtwigModel.newModel()
                    .with("policy", policy)
                    .with("customer", policy.getCustomer())
                    .with("product", policy.getProduct())
                    .with("owner", owner);

            String html = template.render(model);

            Pdf pdf = new Pdf();
            pdf.addPageFromString(html);

            String name = policy.getName().replace(" ", "-");
            String client = policy.getCustomer().getFullName().replace(" ", "-");
            String now = (new SimpleDateFormat("dd-MM-YYYY")).format(new Date());
            String fileName = client + "-" + name + "-" + now + ".pdf";

            fileName = fileName.replace("/", "-");
            fileName = fileName.replace("--", "-");

            try {

                pdf.saveAs("storage/policies/" + fileName);
                policy.setFilename(fileName);
                policiesRepository.save(policy);

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public void generate(Policy policy) throws LogicException {

        if (null == this.owner) {
            throw new LogicException("Owner data is not provided");
        }

        this.policy = policy;

        ThreadGenerator generator = new ThreadGenerator();
        generator.start();
    }
}
