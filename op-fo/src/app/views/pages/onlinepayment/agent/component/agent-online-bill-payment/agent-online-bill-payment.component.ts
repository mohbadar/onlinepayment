import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, AfterViewInit, Output, Input, EventEmitter, Inject, } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LayoutUtilsService, MessageType } from 'app/core/_base/crud';
import { BillType } from 'app/views/pages/onlinepayment/bill-type/model/bill-type.model';
import { BillTypeService } from 'app/views/pages/onlinepayment/bill-type/service/bill-type.service';
import { OnlineBillPayment } from '../../model/agent-online-bill-payment.model';
import { OrganizationService } from '../../../organization/service/organization.service';
import { AgentService } from '../../service/agent.service';
import { AgentSlipPrintComponent } from '../agent-slip-print/agent-slip-print.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'kt-agent-online-bill-payment',
  templateUrl: './agent-online-bill-payment.component.html',
  styleUrls: ['./agent-online-bill-payment.component.scss']
})
export class AgentOnlineBillPaymentComponent implements OnInit {

  @ViewChild('wizard', { static: true }) el: ElementRef;

  hasFormErrors: boolean = false;

  myForm: FormGroup;
  isLoading = false;
  passwordMatch: boolean;

  submitted = false;
  record: OnlineBillPayment;
  provinces$: Observable<any>;
  organizations$: Observable<any>;
  billTypes$: Observable<any>;
  isBillInfoFetched :boolean = false;
  bill: any;

  constructor(
      private formBuilder: FormBuilder,
      private layoutUtilService: LayoutUtilsService,
      private router: Router,
      private spinner: NgxSpinnerService,
      private billTypeService: BillTypeService,
      public dialog: MatDialog,
      private organizationService: OrganizationService,
      private agentService: AgentService,
      private translate: TranslateService
  ) {
  }


  ngOnInit() {

      this.organizations$ = this.organizationService.get();
      this.billTypes$ = this.billTypeService.get();


      this.myForm = this.formBuilder.group({
          organizationId: [, [Validators.required]],
          billTypeId: [, [Validators.required]],
          billIdentifier: [, [Validators.required]]
      });




  }

  ngAfterViewInit(): void {
      // Initialize form wizard
      const wizard = new KTWizard(this.el.nativeElement, {
          startStep: 1
      });

      // Validation before going to next page
      wizard.on('beforeNext', function (wizardObj) {
          // validate the form and use below function to stop the wizard's step
          // wizardObj.stop();
      });

      // Change event
      wizard.on('change', function (wizard) {
          setTimeout(function () {
              KTUtil.scrollTop();
          }, 500);
      });
  }

  submit() {



      this.record = new OnlineBillPayment;
      this.record.billTypeId = this.myForm.get('billTypeId').value;
      this.record.organizationId = this.myForm.get('organizationId').value;
      this.record.billIdentifier = this.myForm.get('billIdentifier').value;

      console.log("Form Data", this.record)
      
      this.spinner.show();
      this.agentService.queryOnlineBillInfo(this.record).subscribe((response) => {

          console.log("BillInfo", response);
          this.bill = response;
          this.isBillInfoFetched=true;
          const _createMessage = `Bill Info Fetched!`;
          this.spinner.hide();
          this.myForm.reset();
          this.layoutUtilService.showActionNotification(_createMessage, MessageType.Create);
          // this.routeHome();
          this.repesentBillDetails(response);
      }, (err) => {
          const msg = 'There was an un-expected situation while processing your request. Please contact your admin';
          this.spinner.hide();
          this.layoutUtilService.showActionNotification(msg);

      });
  }

  repesentBillDetails(item) {
    // const dialogRef = this.dialog.open(BillDetailRepesentationComponent,{ data: { item: item } });
    // dialogRef.afterClosed().subscribe(res => {
    //   if (!res) {
    //     return;
    //       }
    // });
  }


  confirmPayment(bill){

    const _title: string = this.translate.instant('CONFIRMATION');
		const _description: string = this.translate.instant('ARE_YOU_SURE');
		const _waitDesciption: string = this.translate.instant('PROCESSING');
		const _deleteMessage = this.translate.instant('THE_OPERATION_SUCCESSFULLY_DONE');

		const dialogRef = this.layoutUtilService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
      
			if (!res) {
				return;
      }

      this.agentService.confirmOnlinePayment(bill).subscribe((response) => {
        this.layoutUtilService.showActionNotification(_deleteMessage, MessageType.Delete);
        this.printAwiz(response);
      });
			
		});
  }

  
  printAwiz(item) {
    const dialogRef = this.dialog.open(AgentSlipPrintComponent, { data: { item: item } });
    dialogRef.afterClosed().subscribe(res => {
        if (!res) {
            return;
        }
    });
}


  routeHome() {
    this.router.navigate(['/']);
  }

}
