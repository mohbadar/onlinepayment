package af.gov.anar.service_kit.infrastructure.audit.util;


import af.gov.anar.service_kit.infrastructure.audit.data.AuditRequestDto;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

/**
 * Utility class for Audit Manager
 *
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AuditUtils {

	/**
	 * Function to validate {@link AuditRequestDto}
	 * 
	 * @param auditRequest The audit request
	 */
	public static void validateAuditRequest(AuditRequestDto auditRequest) {
		ValidatorFactory factory = null;
		try {
			factory = Validation.buildDefaultValidatorFactory();
			Validator validator = factory.getValidator();

			Set<ConstraintViolation<AuditRequestDto>> violations = validator.validate(auditRequest);

			// if (!violations.isEmpty()) {
			// 	throw new AuditManagerException(AuditErrorCodes.HANDLEREXCEPTION.getErrorCode(),
			// 			AuditErrorCodes.HANDLEREXCEPTION.getErrorMessage());
			// }
		} finally {
			if (factory != null) {
				factory.close();
			}
		}
	}
}
