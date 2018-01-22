package agency.exceptions;

public class BadCredentialsException extends Exception {

    private String detailMessage = "Invalid Credentials.";

    public String getMessage() {
        return this.detailMessage;
    }
}
