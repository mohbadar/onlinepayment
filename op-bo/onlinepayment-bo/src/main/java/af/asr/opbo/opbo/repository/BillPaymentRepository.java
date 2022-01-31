package af.asr.opbo.opbo.repository;

import af.asr.opbo.opbo.model.Agent;
import af.asr.opbo.opbo.model.Bill;
import af.asr.opbo.opbo.model.BillPayment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillPaymentRepository extends CrudRepository<BillPayment, String> {
    BillPayment findByReceiptNo(String receiptNo);
    List<BillPayment> findByBillIdOrderByCreateDateDesc(String billId);

    @Query(nativeQuery =true, value = "SELECT bill_no as billNo, bill_date as billDate,  bill_amount as billAmout, number_of_items as numberOfItems,  receipt_no as receiptNo, confirmed, confirm_date as confirmDate, confirm_user_name as confirmUserName FROM bill LEFT JOIN bill_payment ON bill.id=bill_payment.bill_id WHERE bill_payment.confirm_user_name=:username")
    List<String> getUserBillStatement(String username);
}
