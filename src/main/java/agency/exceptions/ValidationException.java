package agency.exceptions;

import org.springframework.validation.BindingResult;

public class ValidationException extends Exception {

    private BindingResult bindingResult;

    public ValidationException(BindingResult result) {
        this.bindingResult = result;
    }

    public BindingResult getBindingResult() {
        return this.bindingResult;
    }
}
