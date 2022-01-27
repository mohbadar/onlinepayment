package af.gov.anar.service_kit.infrastructure.revision;

import af.gov.anar.service_kit.infrastructure.base.UserService;
import org.hibernate.envers.RevisionListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AuditRevisionListener implements RevisionListener {

    @Autowired
    private UserService userService;


    @Override
    public void newRevision(Object revisionEntity) {
        AuditRevisionEntity auditRevisionEntity = (AuditRevisionEntity) revisionEntity;
//        auditRevisionEntity.setUsername(StringUtils.isNotBlank(userService.getPreferredUsername()) ? userService.getPreferredUsername(): "SYSTEM");
    }

}