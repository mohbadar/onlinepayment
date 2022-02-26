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
import { FeeModelService } from '../../../fee-model/service/fee-model.service';
import { ThirdPartyIntegration } from '../../model/third-party-integration.model';
import { ThirdPartyIntegrationService } from '../../service/third-party-integration.service';
import { KeycloakService } from 'keycloak-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-register-third-party-integration',
  templateUrl: './register-third-party-integration.component.html',
  styleUrls: ['./register-third-party-integration.component.scss']
})
export class RegisterThirdPartyIntegrationComponent implements OnInit {

   @ViewChild('wizard', { static: true }) el: ElementRef;

  hasFormErrors: boolean = false;

  myForm: FormGroup;
  isLoading = false;
  passwordMatch: boolean;

  submitted = false;
  record: ThirdPartyIntegration;
  provinces$: Observable<any>;
  centers$: Observable<any>;
  organizations$: Observable<any>;
  feemodels$: Observable<any>;

  constructor(
      private formBuilder: FormBuilder,
      private layoutUtilService: LayoutUtilsService,
      private router: Router,
      private thirdPartyIntegrationService: ThirdPartyIntegrationService,
      private spinner: NgxSpinnerService,
      private provinceService: ProvinceService,
      private organizationService: OrganizationService,
      private centerService: CenterService,
      private feeModelService: FeeModelService,
      private keycloakService: KeycloakService,
      private translate: TranslateService
  ) {
      if (!this.keycloakService.isUserInRole('register_third_party_integration')) {
        this.router.navigate(['/'])
        this.layoutUtilService.showActionNotification(this.translate.instant('UN_AUTHORIZED_ACCESS'));
      }
  }


  ngOnInit() {

      this.provinces$ = this.provinceService.get();
      this.organizations$ = this.organizationService.get();
      this.centers$ = this.centerService.get();
      this.feemodels$ = this.feeModelService.get();



      this.myForm = this.formBuilder.group({
          name:[, [Validators.required]],
          code:[, [Validators.required]],
          organizationId:[, [Validators.required]],
          provinceId:[, [Validators.required]],
          host:[, [Validators.required]],
          port:[80, [Validators.required]],
          authUri:[, [Validators.required]],
          authUriMethod:[, [Validators.required]],
          billInfoInquiryUri:[, [Validators.required]],
          billInfoInquiryUriMethod:[, [Validators.required]],
          billAdviceMessageUri:[, [Validators.required]],
          billAdviceMessageUriMethod:[, [Validators.required]],
          username:[, [Validators.required]],
          password:[, [Validators.required]],
          authorizationType:[, [Validators.required]],
          credentialPosition:[, [Validators.required]],
          dataExchangeProtocol:[, [Validators.required]],
          apiKey:[, []],
          apiValue:[, []],
          oAuth2GrantType:[, []],
          clientId:[, []],
          clientSecret:[, []],
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


    this.record = this.myForm.value;

    //   this.record = new ThirdPartyIntegration;
    //   this.record.name = this.myForm.get('name').value;
    //   this.record.code = this.myForm.get('code').value;
    //   this.record.provinceId = this.myForm.get('provinceId').value;
    //   this.record.organizationId = this.myForm.get('organizationId').value;
    //   this.record.host = this.myForm.get('host').value;
    //   this.record.port = this.myForm.get('port').value;
    //   this.record.uri = this.myForm.get('uri').value;
    //   this.record.username = this.myForm.get('username').value;
    //   this.record.password = this.myForm.get('password').value;
    //   this.record.authorizationType = this.myForm.get('authorizationType').value;
    //   this.record.credentialPosition = this.myForm.get('credentialPosition').value;
    //   this.record.dataExchangeProtocol = this.myForm.get('dataExchangeProtocol').value;
    //   this.record.apiKey = this.myForm.get('apiKey').value;
    //   this.record.apiValue = this.myForm.get('apiValue').value;
    //   this.record.oAuth2GrantType = this.myForm.get('oAuth2GrantType').value;
    //   this.record.clientId = this.myForm.get('clientId').value;
    //   this.record.clientSecret = this.myForm.get('clientSecret').value;

      console.log("Form Data", this.record)
      this.spinner.show();
      this.thirdPartyIntegrationService.create(this.record).subscribe((response) => {
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
      this.router.navigate(['/third-party-integration']);
  }
}
