import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, AfterViewInit, Output, Input, EventEmitter, Inject, } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LayoutUtilsService, MessageType } from '../../../../../../core/_base/crud';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Organization } from '../../model/organization.model';
import { OrganizationService} from '../../service/organization.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProvinceService } from '../../../province/service/province.service';


@Component({
    selector: 'kt-create-organization',
    templateUrl: './create-organization.component.html',
})
export class CreateOrganizationComponent implements OnInit {

    @ViewChild('wizard', { static: true }) el: ElementRef;

    hasFormErrors: boolean = false;

    myForm: FormGroup;
    isLoading = false;
    passwordMatch: boolean;

    submitted = false;
    record: Organization;
    provinces$: Observable<any>;

    constructor(
        private formBuilder: FormBuilder,
        private layoutUtilService: LayoutUtilsService,
        private router: Router,
        private organizationService: OrganizationService,
        private spinner: NgxSpinnerService,
        private provinceService: ProvinceService

    ) {
    }


    ngOnInit() {

        this.provinces$ = this.provinceService.get();

        this.myForm = this.formBuilder.group({
            name: [, [Validators.required]],
            code: [, [Validators.required]],
            address: [, [Validators.required]],
            email: [, [Validators.required]],
            phone: [, [Validators.required]],
            provinceId: [, [Validators.required]],
            bankName: [, [Validators.required]],
            bankAccountNo: [, [Validators.required]],
            bankCardHolderName: [, [Validators.required]],
            bankCardNo: [, []],
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



        this.record = new Organization;
        this.record.name = this.myForm.get('name').value;
        this.record.code = this.myForm.get('code').value;
        this.record.phone = this.myForm.get('phone').value;
        this.record.email = this.myForm.get('email').value;
        this.record.address = this.myForm.get('address').value;
        this.record.provinceId = this.myForm.get('provinceId').value;
        this.record.bankName = this.myForm.get('bankName').value;
        this.record.bankAccountNo = this.myForm.get('bankAccountNo').value;
        this.record.bankCardHolderName = this.myForm.get('bankCardHolderName').value;
        this.record.bankCardNo = this.myForm.get('bankCardNo').value;



        console.log("Form Data", this.record)
        this.spinner.show();
        this.organizationService.create(this.record).subscribe((response) => {
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
        this.router.navigate(['/organization']);
    }
}
