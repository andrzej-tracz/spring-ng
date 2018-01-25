package agency.http.controllers;

import agency.entity.Owner;
import agency.exceptions.LogicException;
import agency.exceptions.ValidationException;
import agency.repositories.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/owner")
public class OwnerController extends AbstractController {

    private final OwnerRepository owners;

    @Autowired
    public OwnerController(OwnerRepository owners) {
        this.owners = owners;
    }

    @RequestMapping(value = "/show", method = RequestMethod.GET)
    public Owner show() {
        return this.getCurrentOwner();
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Owner save(@Valid @RequestBody Owner owner, BindingResult result) throws ValidationException, LogicException {

        Owner current = this.getCurrentOwner();
        owner.setId(current.getId());

        if (result.hasErrors()) {
            throw new ValidationException(result);
        }

        return this.owners.save(owner);
    }

    private Owner getCurrentOwner() {

        List<Owner> all = this.owners.findAll();

        if (all.size() > 0) {
            return all.get(0);
        }

        return new Owner();
    }
}
