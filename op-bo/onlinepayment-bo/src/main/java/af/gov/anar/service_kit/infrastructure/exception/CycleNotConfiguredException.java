package af.gov.anar.service_kit.infrastructure.exception;

public class CycleNotConfiguredException extends RuntimeException{

    public CycleNotConfiguredException(String message){
        super(message);
    }
}
