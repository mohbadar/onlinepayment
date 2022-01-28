package af.asr.opbo.opbo.repository;

import af.asr.opbo.opbo.model.RectifiedJournalEntry;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RectifiedJournalEntryRepository extends CrudRepository<RectifiedJournalEntry, String> {
}
