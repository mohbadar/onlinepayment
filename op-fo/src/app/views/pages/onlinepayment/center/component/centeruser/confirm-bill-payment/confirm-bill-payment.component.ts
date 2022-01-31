import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { LayoutUtilsService, MessageType } from 'app/core/_base/crud';
import { AgentService } from 'app/views/pages/onlinepayment/agent/service/agent.service';
import { PagesService } from 'app/views/pages/pages.service';
import { KeycloakService } from 'keycloak-angular';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'kt-confirm-bill-payment',
  templateUrl: './confirm-bill-payment.component.html',
  styleUrls: ['./confirm-bill-payment.component.scss']
})
export class ConfirmBillPaymentComponent implements OnInit {

  hasFormErrors: boolean = false;
  isLoading = false;
  billModel = {
    receiptNumber: null
  };
  isBillInfoFetched = false;
  paymentMode = 'CASH';
  paidAmount;
  billNo: any;
  tenderedAmount: number;
  toDayDate: string;
  bill: any;
  billPayment: any;
  agent: any;

  constructor(
      private formBuilder: FormBuilder,
      private cdrf: ChangeDetectorRef,
      public dialog: MatDialog,
      private layoutUtilService: LayoutUtilsService,
      private agentService: AgentService,
      private spinner: NgxSpinnerService,
      private pagesService: PagesService
  ) { }

  ngOnInit() {
      this.toDayDate= this.pagesService.getCurrentJalaliDate();
  }

  getBillInfo() {
      this.billNo = this.billModel.receiptNumber;

      this.spinner.show();
      this.agentService.queryBillPaymentInfo(this.billNo).subscribe((res: any) => {
          this.spinner.hide();
          console.log('Res: ', res);
          if (res != null) {
              this.isBillInfoFetched = true;
              this.agent = res.agent;
              this.bill = res.bill;
              this.billPayment = res.billPayment;
          } else {
              this.spinner.hide();
              this.layoutUtilService.showActionNotification(" No Such Bill Exist / Not A Valid Bill for Payment / Already Paid Bill.");
          }
          // this.
      }, (err) => {
           this.spinner.hide();
              this.layoutUtilService.showActionNotification("No Such Bill Exist / Not A Valid Bill for Payment / Already Paid Bill.");
      })
  }


  confirmPayment(paymentId){
    const _title: string = 'CONFIRM_PAYMENT';
		const _description: string = 'Are you sure to  confirm?';
		const _waitDesciption: string = 'confirming...';
		const _deleteMessage = `The payment has been confirmed`;

		const dialogRef = this.layoutUtilService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
      
			if (!res) {
				return;
      }

      this.agentService.confirmPayment(paymentId).subscribe((response) => {
        this.layoutUtilService.showActionNotification(_deleteMessage, MessageType.Delete);
      });
			
		});
  }

  // printAwiz(item) {
  //     const dialogRef = this.dialog.open(AgentSlipPrintComponent, { data: { item: item } });
  //     dialogRef.afterClosed().subscribe(res => {
  //         if (!res) {
  //             return;
  //         }
  //     });
  // }

}
