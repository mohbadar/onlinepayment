import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, AfterViewInit, Output, Input, EventEmitter, Inject, } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LayoutUtilsService, MessageType } from '../../../../../../core/_base/crud';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProvinceService } from '../../../province/service/province.service';
import { OrganizationService } from '../../../organization/service/organization.service';
import { CenterService } from '../../../center/service/center.service';
import { BillType } from '../../model/bill-type.model';
import { BillTypeService } from '../../service/bill-type.service';
import { FeeModelService } from '../../../fee-model/service/fee-model.service';
import { ThirdPartyIntegrationService } from '../../../third-party-integration/service/third-party-integration.service';
import { KeycloakService } from 'keycloak-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-create-billtype',
  templateUrl: './create-billtype.component.html',
  styleUrls: ['./create-billtype.component.scss']
})
export class CreateBilltypeComponent implements OnInit {

  @ViewChild('wizard', { static: true }) el: ElementRef;

  hasFormErrors: boolean = false;

  myForm: FormGroup;
  isLoading = false;
  passwordMatch: boolean;

  submitted = false;
  record: BillType;
  provinces$: Observable<any>;
  centers$: Observable<any>;
  organizations$: Observable<any>;
  feemodels$: Observable<any>;
    integrations$: Observable<any>;

  constructor(
      private formBuilder: FormBuilder,
      private layoutUtilService: LayoutUtilsService,
      private router: Router,
      private billTypeService: BillTypeService,
      private spinner: NgxSpinnerService,
      private provinceService: ProvinceService,
      private organizationService: OrganizationService,
      private centerService: CenterService,
      private feeModelService: FeeModelService,
      private thirdPartyIntegrationService: ThirdPartyIntegrationService,
      private keycloakService: KeycloakService,
      private translate: TranslateService
  ) {
      
    if (!this.keycloakService.isUserInRole('create_billtype')) {
        this.router.navigate(['/'])
        this.layoutUtilService.showActionNotification(this.translate.instant('UN_AUTHORIZED_ACCESS'));
    }
  }


  ngOnInit() {

      this.provinces$ = this.provinceService.get();
      this.organizations$ = this.organizationService.get();
      this.centers$ = this.centerService.get();
      this.feemodels$ = this.feeModelService.get();
      this.integrations$ = this.thirdPartyIntegrationService.get();



      this.myForm = this.formBuilder.group({
          name: [, [Validators.required]],
          provinceId: [, [Validators.required]],
          organizationId: [, [Validators.required]],
          centerId: [,[]],
          feeModelId: [, [Validators.required]],
          pricePerItem: [, [Validators.required]],
          billingChannel: [, [Validators.required]],
          thirdPartyIntegrationId: [, []],
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



      this.record = new BillType;
      this.record.name = this.myForm.get('name').value;
      this.record.feeModelId = this.myForm.get('feeModelId').value;
      this.record.provinceId = this.myForm.get('provinceId').value;
      this.record.organizationId = this.myForm.get('organizationId').value;
      this.record.centerId = this.myForm.get('centerId').value;
      this.record.pricePerItem = this.myForm.get('pricePerItem').value;
      this.record.thirdPartyIntegrationId = this.myForm.get('thirdPartyIntegrationId').value;
      this.record.billingChannel = this.myForm.get('billingChannel').value;


      console.log("Form Data", this.record)
      this.spinner.show();
      this.billTypeService.create(this.record).subscribe((response) => {
          this.myForm.reset({});
          const _createMessage = `Object has been registered!`;
          this.spinner.hide();
          this.layoutUtilService.showActionNotification(_createMessage, MessageType.Create);
          this.routeHome();
      }, (err) => {
          const msg = 'There was an un-expected situation while processing your request. Please contact your admin';
          this.spinner.hide();
          this.layoutUtilService.showActionNotification(msg);

      });



  }


  routeHome() {
      this.router.navigate(['/bill-type']);
  }
}
