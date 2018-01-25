package agency.http.controllers;

import agency.entity.Policy;
import agency.entity.User;
import agency.exceptions.LogicException;
import agency.exceptions.ValidationException;
import agency.repositories.CustomerRepository;
import agency.repositories.PoliciesRepository;
import agency.services.policies.PolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import java.io.*;

import static agency.services.AuthService.USER_REQUEST_KEY;

@RestController
@RequestMapping("/api/policy")
public class PoliciesController extends AbstractController {

    private final PoliciesRepository policies;

    private final PolicyService policyService;

    @Autowired
    public PoliciesController(PoliciesRepository policies, PolicyService policyService) {
        this.policies = policies;
        this.policyService = policyService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Page<Policy> index(@RequestParam(value = "page") int page) {

        Sort sort = new Sort(Sort.Direction.DESC, "_id");
        Pageable pageable = new PageRequest(--page, perPage, sort);

        return policies.findAll(pageable);
    }

    @RequestMapping(value = "/generate", method = RequestMethod.POST)
    public Policy generate(@Valid @RequestBody Policy requestPolicy) throws LogicException {

        Policy policy = this.policies.findOne(requestPolicy.getId());

        this.policyService.generatePDF(policy);

        return policy;
    }

    @RequestMapping(value = "/download", method = RequestMethod.GET)
    public void download(@RequestParam(value = "id") String id, HttpServletResponse response) throws LogicException {

        Policy policy = this.policies.findOne(id);

        if (!policy.hasGeneratedFile()) {
            throw new LogicException("File not exists");
        }

        try {
            File file = new File("storage/policies/" + policy.getFilename());
            InputStream is = new FileInputStream(file);

            org.apache.commons.io.IOUtils.copy(is, response.getOutputStream());
            response.setHeader("Content-Disposition", "attachment; filename=\"" + policy.getName() + ".pdf\"");
            response.flushBuffer();

        } catch (IOException ex) {
            throw new LogicException("Failed to download");
        }
    }


    @RequestMapping(value = "/show", method = RequestMethod.GET)
    public Policy show(@RequestParam(value = "id") String id) {
        return this.policies.findOne(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Policy create(@Valid @RequestBody Policy policy, BindingResult result, HttpServletRequest request) throws ValidationException, LogicException {

        if (result.hasErrors()) {
            throw new ValidationException(result);
        }

        policy.setUser((User) request.getAttribute(USER_REQUEST_KEY));

        return this.policies.save(policy);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Policy save(@Valid @RequestBody Policy policy, BindingResult result) throws ValidationException, LogicException {

        if (result.hasErrors()) {
            throw new ValidationException(result);
        }

        return this.policies.save(policy);
    }

    @RequestMapping(value = "/mark-as-closed", method = RequestMethod.PUT)
    public Policy markAsCosedAction(@RequestBody Policy policy) throws LogicException {

        this.policyService.markAsClosed(policy);

        return policy;
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @ResponseBody
    public Policy delete(@RequestParam(value = "id") String id) throws LogicException {

        Policy policy = this.policies.findOne(id);

        if (policy.isClosed()) {
            throw new LogicException("Delete.policy.closed");
        }

        policies.delete(policy);

        return policy;
    }
}
