package agency.exceptions;

import javax.servlet.ServletException;

public class LogicException extends ServletException {

    public String detailMessage = "Something went wrong.";

    public LogicException(String message) {
        detailMessage = message;
    }

    public String getMessage() {
        return this.detailMessage;
    }
}
