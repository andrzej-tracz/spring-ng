package agency.http.controllers;

import javax.validation.Valid;

import agency.exceptions.LogicException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import agency.entity.Customer;
import agency.exceptions.ValidationException;
import agency.repositories.CustomerRepository;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/customer")
public class CustomerController extends AbstractController {

    @Autowired
    private CustomerRepository customers;

    @RequestMapping(method = RequestMethod.GET)
    public Page<Customer> index(@RequestParam(value = "page") int page) {
        Pageable pageable = new PageRequest(--page, perPage);

        return customers.findAll(pageable);
    }

    @RequestMapping(value="/active", method = RequestMethod.GET)
    public Map<String, Object> active() {

        Map<String, Object> response = new HashMap<>();
        response.put("content", customers.findActive());

        return response;
    }

    @RequestMapping(value = "/show", method = RequestMethod.GET)
    public Customer show(@RequestParam(value="id") String id) {
        return this.customers.findOne(id);
    }
    @RequestMapping(method = RequestMethod.POST)
    public Customer create(@Valid @RequestBody Customer customer, BindingResult result) throws ValidationException, LogicException {

        if (result.hasErrors()) {
            throw new ValidationException(result);
        }

        Customer exists = this.customers.findByEmail(customer.getEmail());

        if (exists != null) {
            throw new LogicException("Unique.customer.email");
        }

        return this.customers.save(customer);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Customer save(@Valid @RequestBody Customer customer, BindingResult result) throws ValidationException, LogicException {

        if (result.hasErrors()) {
            throw new ValidationException(result);
        }

        Customer exists = this.customers.findByEmail(customer.getEmail());

        if (exists != null && !exists.getId().equals(customer.getId())) {
            throw new LogicException("Unique.customer.email");
        }

        return this.customers.save(customer);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @ResponseBody
    public Customer delete(@RequestParam(value = "id") String id) {

        Customer customer = this.customers.findOne(id);

        customers.delete(customer);

        return customer;
    }
}
