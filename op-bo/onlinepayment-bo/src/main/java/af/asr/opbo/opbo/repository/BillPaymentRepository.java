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

    @Query(nativeQuery =true, value = "SELECT CAST (JSON_BUILD_OBJECT( 'billNo', bill_no, 'billDate', bill_date, 'billAmount', bill_amount, 'numberOfItems', number_of_items,  'receiptNo',receipt_no,   'confirmed',confirmed, 'confirmDate',confirm_date,  'confirmUserName', confirm_user_name) AS VARCHAR) FROM ( \tSELECT bill_no, bill_date,  bill_amount, number_of_items,  receipt_no, confirmed, confirm_date, confirm_user_name FROM bill LEFT JOIN bill_payment ON bill.id=bill_payment.bill_id WHERE bill.created_by=:username ) as t")
    List<String> getUserBillStatement(String username);
}
