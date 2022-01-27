package af.asr.opbo.infrastructure.revision;


import af.asr.opbo.util.HijriDateUtility;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang.StringUtils;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class AuditEnabledEntity {

    @Column(name = "CREATED_BY", updatable = false)
    @JsonIgnore
    @CreatedBy
    private String createdBy;

    @Column(name = "CREATE_DATE", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "yyyy/MM/dd'T'HH:mm:ss.SSS", timezone = "UTC")
    @CreationTimestamp
    @JsonIgnore
    private Date createDate;

    @Column(name = "UPDATED_BY")
    @JsonIgnore
    @LastModifiedBy
    private String updatedBy;

    @JsonFormat(pattern = "yyyy/MM/dd'T'HH:mm:ss.SSS", timezone = "UTC")
    @UpdateTimestamp
    @Column(name = "UPDATE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonIgnore
    private Date updateDate;


    private Boolean deleted = false;

    @JsonIgnore
    private Date deletedAt;

    @JsonIgnore
    @LastModifiedBy
    private String deletedBy;

    @JsonIgnore
    private String month;

    // @JsonIgnore
    private String year;

    @Column(name = "operation")
    private String operation;

    @PrePersist
    public void onPrePersist() {
        audit("INSERT");
    }

    @PreUpdate
    public void onPreUpdate() {
        audit("UPDATE");
    }

    @PreRemove
    public void onPreRemove() {
        audit("DELETE");
    }

    private void audit(String operation) {
        setOperation(operation);
    }

    public AuditEnabledEntity()
    {
        this.month = StringUtils.leftPad(String.valueOf(HijriDateUtility.getCurrentJalaliDateMonth()), 2,"0");
        this.year = StringUtils.leftPad(String.valueOf(HijriDateUtility.getCurrentJalaliDateYear()), 2,"0");
    }

}