package agency.http.controllers;

import agency.entity.Product;
import agency.exceptions.LogicException;
import agency.exceptions.ValidationException;
import agency.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/product")
public class ProductController extends AbstractController {

    private final ProductRepository products;

    @Autowired
    public ProductController(ProductRepository products) {
        this.products = products;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Page<Product> index(@RequestParam(value = "page") int page) {

        Pageable pageable = new PageRequest(--page, perPage);

        return products.findAll(pageable);
    }

    @RequestMapping(value = "/active", method = RequestMethod.GET)
    public Map<String, Object> active() {

        Map<String, Object> response = new HashMap<>();
        response.put("content", products.findActive());

        return response;
    }

    @RequestMapping(value = "/show", method = RequestMethod.GET)
    public Product show(@RequestParam(value = "id") String id) {
        return this.products.findOne(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Product create(@Valid @RequestBody Product product, BindingResult result) throws ValidationException, LogicException {

        if (result.hasErrors()) {
            throw new ValidationException(result);
        }

        return this.products.save(product);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Product save(@Valid @RequestBody Product product, BindingResult result) throws ValidationException, LogicException {

        if (result.hasErrors()) {
            throw new ValidationException(result);
        }

        return this.products.save(product);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @ResponseBody
    public Product delete(@RequestParam(value = "id") String id) {

        Product product = this.products.findOne(id);

        products.delete(product);

        return product;
    }
}
