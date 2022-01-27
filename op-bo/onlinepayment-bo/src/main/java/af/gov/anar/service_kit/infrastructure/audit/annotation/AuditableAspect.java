package af.gov.anar.service_kit.infrastructure.audit.annotation;

import af.gov.anar.service_kit.infrastructure.audit.data.AuditRequestDto;
import af.gov.anar.service_kit.infrastructure.audit.handler.AuditHandlerImpl;
import af.gov.anar.service_kit.infrastructure.base.HostService;
import af.gov.anar.service_kit.infrastructure.base.UserService;
import af.gov.anar.service_kit.infrastructure.constant.ApplicationGenericConstants;
import af.gov.anar.lib.json.JsonUtility;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Aspect
@Component
@Profile(value = "prod")
public class AuditableAspect {

    Logger log = LoggerFactory.getLogger(af.gov.anar.lib.logger.annotation.LoggingAspect.class.getName());

    @Autowired
    private AuditHandlerImpl auditHandler;

    @Autowired
    private HostService hostService;

    @Autowired
    private UserService userService;

//    @Async
    @Before("@annotation(af.gov.anar.service_kit.infrastructure.audit.annotation.Auditable)")
    public void annotatedBeforeLoggingAdvice(JoinPoint joinPoint) throws Throwable{
        String desc = "[" + joinPoint.getSignature().getDeclaringTypeName() + "]" +
                "[" + ((MethodSignature) joinPoint.getSignature()).getMethod().getName() + "] " +
                "Input Params : " + JsonUtility.javaObjectToJsonString(joinPoint.getArgs());
//        log.info(desc);

        String methodName = ((MethodSignature) joinPoint.getSignature()).getMethod().getName();
        String eventId= joinPoint.getSignature().getDeclaringTypeName() + " | "+  methodName ;
        String eventName= joinPoint.getSignature().getDeclaringTypeName();

        AuditRequestDto dto = new AuditRequestDto();
        dto.setHostIp(hostService.getDefaultIP());
        dto.setSessionUserName(userService.getName());
        dto.setApplicationId(ApplicationGenericConstants.APPLICATION_ID);
        dto.setApplicationName(ApplicationGenericConstants.APPLICATION_NAME);
        dto.setDescription(desc);
        dto.setEventId(eventId);
        dto.setEventName(eventName);
        dto.setEventType(joinPoint.getSignature().getDeclaringType().toGenericString());
        dto.setHostName(hostService.getDefaultHostName());
        dto.setId(methodName);
        dto.setIdType(methodName);
        dto.setSessionUserId(userService.getId());
        dto.setModuleName(joinPoint.toLongString());
        dto.setModuleId(joinPoint.toLongString());
        dto.setCreatedBy(userService.getName());
        dto.setActionTimeStamp(LocalDateTime.now());
        dto.setCreatedBy(userService.getPreferredUsername());
        dto.setSessionUserId(userService.getId());
        dto.setSessionUserName(userService.getPreferredUsername());
        auditHandler.saveAuditRequestDto(dto);
    }

}