package af.asr.opbo.opbo.dto;

import lombok.Data;

@Data
public class GenerateDateBasedStatementDTO {
    private String organizationId;
    private String centerId;
    private String startDate;
    private String endDate;
    private String status;
}
