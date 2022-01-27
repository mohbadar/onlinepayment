package af.gov.anar.service_kit.infrastructure.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;


/**
 * The Class SuccessResponseDTO.
 */
@Getter
@Setter
public class SuccessResponseDTO {
    private String code;
    private String message;
    private Map<String, Object> otherAttributes;
    private String infoType;
}
