package af.asr.opbo.opbo.dto;

import lombok.Data;

import java.util.List;

@Data
public class CenterUserRelationDTO {
    private String centerId;
    private List<String> userIds;
    private String desc;
}
