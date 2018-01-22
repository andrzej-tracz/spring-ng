package agency.exceptions;

import javax.servlet.ServletException;

public class AccessDeniedException extends ServletException {

    public String detailMessage = "Access Danied.";

    public String getMessage() {
        return this.detailMessage;
    }
}
