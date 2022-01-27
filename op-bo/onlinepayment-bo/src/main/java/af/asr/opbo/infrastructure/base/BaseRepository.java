package af.asr.opbo.infrastructure.base;

import af.asr.opbo.infrastructure.revision.RevisionDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.history.RevisionRepository;

import java.util.ArrayList;
import java.util.List;

@NoRepositoryBean
public interface BaseRepository<T extends BaseEntity> extends JpaRepository<T, String>, RevisionRepository<T, String,Integer> {

    Iterable<T>  findByDeleted(boolean deleted);
    Iterable<T>  findByDeletedBy(String deletedBy);
    Iterable<T>  findBySourceOfficeId(String provinceCode);
    Iterable<T>  findByTargetOfficeId(String junctionCode);

    default List<RevisionDTO> getRevisions(String id)
    {
        List<RevisionDTO> revisionDTOS = new ArrayList<>();
        this.findRevisions(id).forEach(revision -> {
            revisionDTOS.add(new RevisionDTO(revision.getEntity()));
        });
        return revisionDTOS;
    }

}
