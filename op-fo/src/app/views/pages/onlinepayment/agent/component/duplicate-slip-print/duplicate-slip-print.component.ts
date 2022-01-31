import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { LayoutUtilsService } from 'app/core/_base/crud';
import { PagesService } from 'app/views/pages/pages.service';
import { KeycloakService } from 'keycloak-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { CollectionModel } from '../../model/collection.model';
import { AgentService } from '../../service/agent.service';
import { AgentSlipPrintComponent } from '../agent-slip-print/agent-slip-print.component';

@Component({
  selector: 'kt-duplicate-slip-print',
  templateUrl: './duplicate-slip-print.component.html',
  styleUrls: ['./duplicate-slip-print.component.scss']
})
export class DuplicateSlipPrintComponent implements OnInit {

  hasFormErrors: boolean = false;
  eBreshnaForm: FormGroup;
  isLoading = false;
  submitted = false;
  isPrinting = false;
  collection: CollectionModel;
  billModel = {
      billNumber: null
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
      private spinner: NgxSpinnerService,
      private pagesService: PagesService
  ) { }

  ngOnInit() {

      this.eBreshnaForm = this.formBuilder.group({
          userId: []
      });

      this.toDayDate= this.pagesService.getCurrentJalaliDate();
  }

  getBillInfo() {
      this.billNo = this.billModel.billNumber;

      this.spinner.show();
      this.agentService.queryDuplicateBillForAwizPrint(this.billNo).subscribe((res: any) => {
          this.spinner.hide();
          console.log('Res: ', res);
          if (res != null) {
              this.isBillInfoFetched = true;
              this.printAwiz(res);
              // this.cdrf.detectChanges();
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

}
