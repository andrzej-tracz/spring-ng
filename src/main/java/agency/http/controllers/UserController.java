package agency.http.controllers;

import agency.entity.User;
import agency.exceptions.ValidationException;
import agency.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/user")
public class UserController extends AbstractController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(method = RequestMethod.GET)
    public Page<User> index(@RequestParam(value = "page") int page) {
        Pageable pageable = new PageRequest(--page, perPage);

        return  userRepository.findAll(pageable);
    }

    @RequestMapping(value="/active", method = RequestMethod.GET)
    public Map<String, Object> active() {

        Map<String, Object> response = new HashMap<>();
        response.put("content", userRepository.findActive());

        return response;
    }

    @RequestMapping(value = "/show", method = RequestMethod.GET)
    public User show(@RequestParam(value = "id") String id) {

        return this.userRepository.findOne(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public User create(@Valid @RequestBody User user, BindingResult result) throws ValidationException {

        if (StringUtils.isEmpty(user.getPassword())) {
            result.addError(new ObjectError("user", "Password must be set"));
        }

        if (result.hasErrors()) {
            throw new ValidationException(result);
        }

        User u = this.userRepository.save(user);

        System.out.println(u);
        return u;
    }

    @RequestMapping(method = RequestMethod.PUT)
    public User save(@Valid @RequestBody User user, BindingResult result) throws ValidationException {

        if (result.hasErrors()) {
            throw new ValidationException(result);
        }

        return this.userRepository.save(user);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @ResponseBody
    public User delete(@RequestParam(value = "id") String id) {

        User user = this.userRepository.findOne(id);

        userRepository.delete(user);

        return user;
    }
}
