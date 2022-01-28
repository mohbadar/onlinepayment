package af.asr.opbo.opbo.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProvinceUserRelationDTO {

    private String provinceId;
    private List<String> userIds;
    private String desc;
}
