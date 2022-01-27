package af.gov.anar.service_kit.infrastructure.exception;

public class UnAuthorizedException extends RuntimeException {
    public UnAuthorizedException(String message)
    {
        super(message);
    }
}
