import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LayoutUtilsService } from 'app/core/_base/crud';
import { PagesService } from 'app/views/pages/pages.service';
import { KeycloakService } from 'keycloak-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { CollectionModel } from '../../model/collection.model';
import { AgentService } from '../../service/agent.service';
import { AgentSlipPrintComponent } from '../agent-slip-print/agent-slip-print.component';

@Component({
  selector: 'kt-agent-bill-payment',
  templateUrl: './agent-bill-payment.component.html',
  styleUrls: ['./agent-bill-payment.component.scss']
})
export class AgentBillPaymentComponent implements OnInit {

  hasFormErrors: boolean = false;
  eBreshnaForm: FormGroup;
  isLoading = false;
  submitted = false;
  isPrinting = false;
  collection: CollectionModel;
  billModel = {
      billNumber: null
  };
  billInformation = {
      billDate: '',
      billDueDate: '',
      cycle: '',
      year: '',
      billAmount: '',
      totalBalance: ''
  };

  isBillInfoFetched = false;
  paymentMode = 'CASH';
  paidAmount;
  billNo: any;
  tenderedAmount: number;
  toDayDate: string;

  constructor(
      private formBuilder: FormBuilder,
      private cdrf: ChangeDetectorRef,
      public dialog: MatDialog,
      private layoutUtilService: LayoutUtilsService,
      private agentService: AgentService,
      private keycloakService: KeycloakService,
      private spinner: NgxSpinnerService,
      private pagesService: PagesService,
      private translate: TranslateService,
      private router: Router
  ) {
    if (!this.keycloakService.isUserInRole('agent_bill_payment')) {
        this.router.navigate(['/'])
        this.layoutUtilService.showActionNotification(this.translate.instant('UN_AUTHORIZED_ACCESS'));
    }
   }

  ngOnInit() {

      this.eBreshnaForm = this.formBuilder.group({
          userId: []
      });

      this.toDayDate= this.pagesService.getCurrentJalaliDate();
  }

  getBillInfo() {
      this.billNo = this.billModel.billNumber;

      //DABS698989
      this.spinner.show();
      this.agentService.queryBill(this.billNo).subscribe((res: any) => {
          this.spinner.hide();
          console.log('Res: ', res);
          if (res != null) {

              console.log('PaymentCollectionDTO: ', res);
              this.isBillInfoFetched = true;
              // As well as the bill information
              const billInformationrsponse =
              {
                  billDate: res.billDate,
                  billDueDate: res.billDueDate,
                  cycle: res.cycle,
                  year: res.year,
                  billAmount: res.billAmount,
                  totalBalance: res.balance
              };

              this.billInformation = billInformationrsponse;
              this.tenderedAmount = Math.ceil(res.billAmount);
              this.paidAmount = Math.ceil(res.billAmount);
              this.cdrf.detectChanges();
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

  printAwiz(item) {
      const dialogRef = this.dialog.open(AgentSlipPrintComponent, { data: { item: item } });
      dialogRef.afterClosed().subscribe(res => {
          if (!res) {
              return;
          }
      });
  }


  saveCollection() {
      this.collection = new CollectionModel();
      this.collection.billNo = this.billNo;
      this.collection.paidAmount = this.paidAmount;
      this.collection.tenderedAmount = this.tenderedAmount;
      this.collection.paymentType = this.paymentMode;

      this.spinner.show();
      this.agentService.postCollection(this.collection).subscribe((res: any) => {
          this.spinner.hide();
          this.layoutUtilService.showActionNotification("Bill Payment Transaction Done");

          console.log(res);
          this.printAwiz(res);
          this.eBreshnaForm.reset();
          this.billInformation= {
                  billDate: '',
                  billDueDate: '',
                  cycle: '',
                  year: '',
                  billAmount: '',
                  totalBalance: ''
        };
        this.tenderedAmount = null;
        this.paidAmount = null;
      }
      , (err) => {
          console.log("Err", err);
          this.spinner.hide();
          this.layoutUtilService.showActionNotification(err.message);
      });
  }

}
