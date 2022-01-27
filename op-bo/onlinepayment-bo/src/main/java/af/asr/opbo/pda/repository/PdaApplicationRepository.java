package af.asr.opbo.pda.repository;

import af.asr.opbo.pda.model.PdaApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PdaApplicationRepository extends JpaRepository<PdaApplication, String> {

    PdaApplication findByNidFamilyNo(String familyNo);
//    List<PdaApplication> findByVerified(boolean verified);
//    List<PdaApplication> findByVerifiedAndNidFamilyNoStartsWith(boolean verified, String nidFamilyNo);

    @Query(value = "SELECT * FROM nid_pda_application WHERE split_part(nid_family_no,'-', 2) =:centerCode AND rejected=:rejected AND verified=:verified", nativeQuery = true)
    List<PdaApplication> findNidFamilyNoContainingAndRejectedAndVerified(@Param("centerCode") String centerCode,@Param("rejected") boolean rejected,@Param("verified") boolean verified);
  
    List<PdaApplication> findByVerifiedAndRejected(boolean verified, boolean rejected);
    List<PdaApplication> findByVerifiedAndRejectedAndNidFamilyNoStartsWith(boolean verified,boolean rejected, String nidFamilyNo);
}
