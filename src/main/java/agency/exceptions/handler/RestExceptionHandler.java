package agency.exceptions.handler;

import agency.exceptions.AccessDeniedException;
import agency.exceptions.BadCredentialsException;
import agency.exceptions.LogicException;
import agency.exceptions.ValidationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@ControllerAdvice
public class RestExceptionHandler {

    private MessageSource messageSource;

    final private Locale locale = LocaleContextHolder.getLocale();

    @Autowired
    public RestExceptionHandler(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @ExceptionHandler(ValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ValidationError handle(ValidationException ex) {

        BindingResult result = ex.getBindingResult();
        List<FieldError> fieldErrors = result.getFieldErrors();

        return processFieldErrors(fieldErrors);
    }

    @ExceptionHandler(DuplicateKeyException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Object handle(DuplicateKeyException ex) {

        return new RestResponseForException(ex);
    }

    @ExceptionHandler(LogicException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Object handle(LogicException ex) {

        return new RestResponseForException(ex);
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public Object handle(AccessDeniedException ex) {
        return new RestResponseForException(ex);
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Object handle(BadCredentialsException ex) {
        return new RestResponseForException(ex);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public Object handle(Exception ex) {
        return new RestResponseForException(ex);
    }

    private ValidationError processFieldErrors(List<FieldError> fieldErrors) {
        ValidationError validationError = new ValidationError();

        for (FieldError fieldError: fieldErrors) {
            String localizedErrorMessage = resolveLocalizedErrorMessage(fieldError);
            validationError.addFieldError(fieldError.getField(), localizedErrorMessage);
        }

        return validationError;
    }

    private String resolveLocalizedErrorMessage(FieldError fieldError) {

        Locale currentLocale = LocaleContextHolder.getLocale();
        String message = messageSource.getMessage(fieldError, currentLocale);

        if (message.equals(fieldError.getDefaultMessage())) {
            String[] fieldErrorCodes = fieldError.getCodes();
            message = fieldErrorCodes[0];
        }

        return message;
    }

    /**
     * Single class for single form filed element
     */
    public class FormFieldError {

        private String field;

        private String message;

        FormFieldError(String field, String message) {
            this.field = field;
            this.message = message;
        }

        public String  getField() {
            return this.field;
        }

        public String  getMessage() {
            return this.message;
        }
    }

    /**
     * Class for presentation validation errors
     */
    class ValidationError {

        private List<FormFieldError> errors = new ArrayList<>();

        void addFieldError(String path, String message) {
            FormFieldError error = new FormFieldError(path, message);
            errors.add(error);
        }

        public List<FormFieldError> getErrors() {
            return this.errors;
        }
    }

    /**
     * Presentation for other kinds of internal errors
     */
    private class RestResponseForException {

        public String exception;

        public String message;

        public StackTraceElement[] trace;

        private RestResponseForException(Exception e) {
            String className = e.getClass().toString().substring(6);
            String message;

            try {
                message = messageSource.getMessage(className, null, locale);
            } catch (NoSuchMessageException ex) {
                try {
                    message = messageSource.getMessage(e.getMessage(), null, locale);
                } catch (NoSuchMessageException exception) {
                    message = e.getMessage();
                }
            }
            this.trace = e.getStackTrace();
            this.message = message;
            this.exception = className;
        }
    }
}
