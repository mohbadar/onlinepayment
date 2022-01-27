package af.asr.opbo.infrastructure.exception;

public class CycleNotConfiguredException extends RuntimeException{

    public CycleNotConfiguredException(String message){
        super(message);
    }
}
