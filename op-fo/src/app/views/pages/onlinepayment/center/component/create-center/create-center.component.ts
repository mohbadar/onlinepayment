import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, AfterViewInit, Output, Input, EventEmitter, Inject, } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LayoutUtilsService, MessageType } from '../../../../../../core/_base/crud';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProvinceService } from '../../../province/service/province.service';
import { Center } from '../../model/center.model';
import { CenterService } from '../../service/center.service';
import { OrganizationService } from '../../../organization/service/organization.service';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';


@Component({
    selector: 'kt-create-center',
    templateUrl: './create-center.component.html',
})
export class CreateCenterComponent implements OnInit {

    @ViewChild('wizard', { static: true }) el: ElementRef;

    hasFormErrors: boolean = false;

    myForm: FormGroup;
    isLoading = false;
    passwordMatch: boolean;

    submitted = false;
    record: Center;
    provinces$: Observable<any>;
    centers$: Observable<any>;
    organizations$: any;

    constructor(
        private formBuilder: FormBuilder,
        private layoutUtilService: LayoutUtilsService,
        private router: Router,
        private centerService: CenterService,
        private spinner: NgxSpinnerService,
        private provinceService: ProvinceService,
        private organizationService: OrganizationService,
        private keycloakService: KeycloakService,
        private translate: TranslateService

    ) {
        if (!this.keycloakService.isUserInRole('create_center')) {
            this.router.navigate(['/'])
            this.layoutUtilService.showActionNotification(this.translate.instant('UN_AUTHORIZED_ACCESS'));
        }
    }


    ngOnInit() {

        this.provinces$ = this.provinceService.get();
        this.organizations$ = this.organizationService.get();
        this.centers$ = this.centerService.get();


        this.myForm = this.formBuilder.group({
            name: [, [Validators.required]],
            code: [, [Validators.required]],
            address: [, [Validators.required]],
            email: [, [Validators.required]],
            phone: [, [Validators.required]],
            provinceId: [, [Validators.required]],
            organizationId: [, [Validators.required]],
            parentCenter: []
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



        this.record = new Center;
        this.record.name = this.myForm.get('name').value;
        this.record.code = this.myForm.get('code').value;
        this.record.phone = this.myForm.get('phone').value;
        this.record.email = this.myForm.get('email').value;
        this.record.address = this.myForm.get('address').value;
        this.record.provinceId = this.myForm.get('provinceId').value;
        this.record.organizationId = this.myForm.get('organizationId').value;
        this.record.parentCenter = this.myForm.get('parentCenter').value;


        console.log("Form Data", this.record)
        this.spinner.show();
        this.centerService.create(this.record).subscribe((response) => {
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
        this.router.navigate(['/center']);
    }
}
