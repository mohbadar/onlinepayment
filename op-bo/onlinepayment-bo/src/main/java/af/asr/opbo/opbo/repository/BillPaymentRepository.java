package af.asr.opbo.opbo.repository;

import af.asr.opbo.opbo.model.Agent;
import af.asr.opbo.opbo.model.Bill;
import af.asr.opbo.opbo.model.BillPayment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillPaymentRepository extends CrudRepository<BillPayment, String> {
    BillPayment findByReceiptNo(String receiptNo);
    List<BillPayment> findByBillIdOrderByCreateDateDesc(String billId);
}
