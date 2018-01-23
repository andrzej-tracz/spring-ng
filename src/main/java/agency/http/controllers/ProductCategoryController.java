package agency.http.controllers;

import agency.entity.ProductCategory;
import agency.exceptions.LogicException;
import agency.exceptions.ValidationException;
import agency.repositories.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/product-category")
public class ProductCategoryController extends AbstractController {

    private final ProductCategoryRepository categories;

    @Autowired
    public ProductCategoryController(ProductCategoryRepository categories) {
        this.categories = categories;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Page<ProductCategory> index(@RequestParam(value = "page") int page) {

        Pageable pageable = new PageRequest(--page, perPage);

        return categories.findAll(pageable);
    }

    @RequestMapping(value = "/show", method = RequestMethod.GET)
    public ProductCategory show(@RequestParam(value = "id") String id) {
        return this.categories.findOne(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ProductCategory create(@Valid @RequestBody ProductCategory category, BindingResult result) throws ValidationException, LogicException {

        if (result.hasErrors()) {
            throw new ValidationException(result);
        }

        return this.categories.save(category);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ProductCategory save(@Valid @RequestBody ProductCategory category, BindingResult result) throws ValidationException, LogicException {

        if (result.hasErrors()) {
            throw new ValidationException(result);
        }

        return this.categories.save(category);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @ResponseBody
    public ProductCategory delete(@RequestParam(value = "id") String id) {

        ProductCategory category = this.categories.findOne(id);

        categories.delete(category);

        return category;
    }
}
