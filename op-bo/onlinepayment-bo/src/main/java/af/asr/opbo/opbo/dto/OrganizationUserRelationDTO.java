package af.asr.opbo.opbo.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrganizationUserRelationDTO {
    private String organizationId;
    private List<String> userIds;
    private String desc;
}
