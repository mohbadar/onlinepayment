import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, AfterViewInit, Output, Input, EventEmitter, Inject, } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LayoutUtilsService, MessageType } from '../../../../../../core/_base/crud';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FeeModel } from '../../model/feemodel.model';
import { FeeModelService } from '../../service/fee-model.service';
import { KeycloakService } from 'keycloak-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-create-feemodel',
  templateUrl: './create-feemodel.component.html',
  styleUrls: ['./create-feemodel.component.scss']
})
export class CreateFeemodelComponent implements OnInit {

  @ViewChild('wizard', { static: true }) el: ElementRef;

    hasFormErrors: boolean = false;

    myForm: FormGroup;
    isLoading = false;
    passwordMatch: boolean;

    submitted = false;
    record: FeeModel;
  isItemBased: boolean;
  isPercentageBased: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private layoutUtilService: LayoutUtilsService,
        private router: Router,
        private feeModelService: FeeModelService,
        private spinner: NgxSpinnerService,
        private keycloakService: KeycloakService,
        private translate: TranslateService

    ) {

      if (!this.keycloakService.isUserInRole('create_feemodel')) {
        this.router.navigate(['/'])
        this.layoutUtilService.showActionNotification(this.translate.instant('UN_AUTHORIZED_ACCESS'));
      }

    }


    ngOnInit() {


        this.myForm = this.formBuilder.group({
            name: [, [Validators.required]],
            type: [, [Validators.required]],
            isItemBased: [, [Validators.required]],
            percentage: [, [Validators.required]],
            amount: [, [Validators.required]],
            agentFeePercentage:[, [Validators.required]],
            agentFeeAmount: [, [Validators.required]],
            feeInclusion: [, [Validators.required]]

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



        this.record = new FeeModel;
        this.record.name = this.myForm.get('name').value;
        this.record.type = this.myForm.get('type').value;
        this.record.isItemBased = this.isItemBased;
        this.record.percentage = this.myForm.get('percentage').value;
        this.record.amount = this.myForm.get('amount').value;
        this.record.agentFeeAmount = this.myForm.get('agentFeeAmount').value;
        this.record.agentFeePercentage = this.myForm.get('agentFeePercentage').value;
        this.record.feeInclusion = this.myForm.get('feeInclusion').value;


        // this.record.provinceCode = this.myForm.get('provinceCode').value;

        console.log("Form Data", this.record)
        this.spinner.show();
        this.feeModelService.create(this.record).subscribe((response) => {
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

    setIsItemBased(value)
    {
      if(value=="YES"){
        this.isItemBased=true;
      }else{
        this.isItemBased=false;
      }
    }

    setIsPercentageBased(value)
    {
      if(value== "PERCENTAGE"){
        this.isPercentageBased=true;
      }else{
        this.isPercentageBased=false;
      }
    }


    routeHome() {
        this.router.navigate(['/fee-model']);
    }
}
