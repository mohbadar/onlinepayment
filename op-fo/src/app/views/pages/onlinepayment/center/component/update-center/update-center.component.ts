import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataExchangeService } from 'app/core/service/data.exchange.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LayoutUtilsService, MessageType } from 'app/core/_base/crud';
import { NgxSpinnerService } from 'ngx-spinner';
import { Center } from '../../model/center.model';
import { CenterService } from '../../service/center.service';
import { KeycloakService } from 'keycloak-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'kt-update-center',
    templateUrl: './update-center.component.html',
})
export class UpdateCenterComponent implements OnInit {

    item: any;


    @ViewChild('wizard', { static: true }) el: ElementRef;

    hasFormErrors: boolean = false;

    myForm: FormGroup;
    isLoading = false;
    passwordMatch: boolean;

    submitted = false;
    record: Center;

    constructor(
        private formBuilder: FormBuilder,
        private centerService: CenterService,
        private dataExchangeService: DataExchangeService,
        private router: Router,
        private layoutUtilService: LayoutUtilsService,
        private spinner: NgxSpinnerService,
        private keycloakService: KeycloakService,
        private translate: TranslateService,
        private layoutUtilsService: LayoutUtilsService

    ) {
        if (!this.keycloakService.isUserInRole('update_center')) {
            this.router.navigate(['/'])
            this.layoutUtilsService.showActionNotification(this.translate.instant('UN_AUTHORIZED_ACCESS'));
        }
     }

    ngOnInit() {

        this.myForm = this.formBuilder.group({
            name: [, [Validators.required]],
            code: [, [Validators.required]],
        });

        this.loadItem();


    }

    loadItem() {
        this.dataExchangeService.currentData.subscribe(
            data => {
                if (data === undefined || data === null) {
                    this.redirectHome();
                }
                else {
                    this.item = data;
                    this.setForm(this.item)
                }
            },
            error => {
                throw error;
            }
        );
    }

    setForm(record) {
        this.myForm.patchValue(record)
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
        const data = { ...this.item, ...this.record };
        this.spinner.show();
        this.centerService.update(data.id, data).subscribe((response) => {
            this.myForm.reset({});
            const _createMessage = `Object has been registered!`;
            this.spinner.hide();
            this.layoutUtilService.showActionNotification(_createMessage, MessageType.Create);
            this.redirectHome();
        }, (err) => {
            const msg = 'There was an un-expected situation while processing your request. Please contact your admin';
            this.spinner.hide();
            this.layoutUtilService.showActionNotification(msg);

        });



    }


    redirectHome() {
        this.router.navigate(['/organization']);
    }

}
