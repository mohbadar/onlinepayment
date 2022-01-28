package af.asr.opbo.opbo.dto;

import lombok.Data;

import java.util.List;

@Data
public class AgentUserRelationDTO {
    private String agentId;
    private List<String> userIds;
    private String desc;
}
