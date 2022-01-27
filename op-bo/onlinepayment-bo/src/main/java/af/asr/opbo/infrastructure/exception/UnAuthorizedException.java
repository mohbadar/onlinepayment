package af.asr.opbo.infrastructure.exception;

public class UnAuthorizedException extends RuntimeException {
    public UnAuthorizedException(String message)
    {
        super(message);
    }
}
