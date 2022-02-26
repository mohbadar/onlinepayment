import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, AfterViewInit, Output, Input, EventEmitter, Inject, } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IssueBill } from '../../../model/issue-bill.model';
import { LayoutUtilsService, MessageType } from 'app/core/_base/crud';
import { CenterService } from '../../../service/center.service';
import { BillType } from 'app/views/pages/onlinepayment/bill-type/model/bill-type.model';
import { BillTypeService } from 'app/views/pages/onlinepayment/bill-type/service/bill-type.service';
import { BillDetailRepesentationComponent } from '../bill-detail-repesentation/bill-detail-repesentation.component';
import { KeycloakService } from 'keycloak-angular';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'kt-issue-bill',
  templateUrl: './issue-bill.component.html',
  styleUrls: ['./issue-bill.component.scss']
})
export class IssueBillComponent implements OnInit {

  @ViewChild('wizard', { static: true }) el: ElementRef;

    hasFormErrors: boolean = false;

    myForm: FormGroup;
    isLoading = false;
    passwordMatch: boolean;

    submitted = false;
    record: IssueBill;
    provinces$: Observable<any>;
    centers$: Observable<any>;
    organizations$: Observable<any>;
  billTypes$: Observable<any>;

    constructor(
        private formBuilder: FormBuilder,
        private layoutUtilService: LayoutUtilsService,
        private router: Router,
        private spinner: NgxSpinnerService,
        private centerService: CenterService,
        private billTypeService: BillTypeService,
        public dialog: MatDialog,
        private keycloakService: KeycloakService,
        private translate: TranslateService
    ) {
        if (!this.keycloakService.isUserInRole('issue_bill')) {
            this.router.navigate(['/'])
            this.layoutUtilService.showActionNotification(this.translate.instant('UN_AUTHORIZED_ACCESS'));
        }
    }


    ngOnInit() {

        this.centers$ = this.centerService.get();
        this.billTypes$ = this.billTypeService.get();


        this.myForm = this.formBuilder.group({
            centerId: [, [Validators.required]],
            billTypeId: [, [Validators.required]],
            numberOfItems: [, [Validators.required]],
            organizationUniqueBillIdentifier: [, [Validators.required]]
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



        this.record = new IssueBill;
        this.record.billTypeId = this.myForm.get('billTypeId').value;
        this.record.numberOfItems = this.myForm.get('numberOfItems').value;
        this.record.organizationUniqueBillIdentifier = this.myForm.get('organizationUniqueBillIdentifier').value;
        this.record.centerId = this.myForm.get('centerId').value;
        console.log("Form Data", this.record)
        
        this.spinner.show();
        this.centerService.issueBill(this.record).subscribe((response) => {
            this.myForm.reset({});
            const _createMessage = `Object has been registered!`;
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
      const dialogRef = this.dialog.open(BillDetailRepesentationComponent,{ data: { item: item } });
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
