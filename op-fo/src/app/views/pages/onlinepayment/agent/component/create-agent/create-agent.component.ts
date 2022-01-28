import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, AfterViewInit, Output, Input, EventEmitter, Inject, } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LayoutUtilsService, MessageType } from '../../../../../../core/_base/crud';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProvinceService } from '../../../province/service/province.service';
import { AgentService } from '../../service/agent.service';
import { Agent } from '../../model/agent.model';
import { OrganizationService } from '../../../organization/service/organization.service';
import { CenterService } from '../../../center/service/center.service';


@Component({
    selector: 'kt-create-agent',
    templateUrl: './create-agent.component.html',
})
export class CreateAgentComponent implements OnInit {

    @ViewChild('wizard', { static: true }) el: ElementRef;

    hasFormErrors: boolean = false;

    myForm: FormGroup;
    isLoading = false;
    passwordMatch: boolean;

    submitted = false;
    record: Agent;
    provinces$: Observable<any>;
    centers$: Observable<any>;
    organizations$: Observable<any>;

    constructor(
        private formBuilder: FormBuilder,
        private layoutUtilService: LayoutUtilsService,
        private router: Router,
        private agentService: AgentService,
        private spinner: NgxSpinnerService,
        private provinceService: ProvinceService,
        private organizationService: OrganizationService,
        private centerService: CenterService
    ) {
    }


    ngOnInit() {

        this.provinces$ = this.provinceService.get();
        this.organizations$ = this.organizationService.get();
        this.centers$ = this.centerService.get();


        this.myForm = this.formBuilder.group({
            firstname: [, [Validators.required]],
            lastname: [, [Validators.required]],
            address: [, [Validators.required]],
            email: [, [Validators.required]],
            phone: [, [Validators.required]],
            provinceId: [, [Validators.required]],
            organizationId: [, []],
            centerId: [,[]],
            grantFathername: [, [Validators.required]],
            tazkiraNo: [, [Validators.required]],
            friendAccountNo1: [, []],
            friendAccountNo2: [, []],
            fathername: [, [Validators.required]]
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



        this.record = new Agent;
        this.record.firstname = this.myForm.get('firstname').value;
        this.record.phone = this.myForm.get('phone').value;
        this.record.email = this.myForm.get('email').value;
        this.record.address = this.myForm.get('address').value;
        this.record.provinceId = this.myForm.get('provinceId').value;
        this.record.lastname = this.myForm.get('lastname').value;
        this.record.fathername = this.myForm.get('fathername').value;
        this.record.grantFathername = this.myForm.get('grantFathername').value;
        this.record.organizationId = this.myForm.get('organizationId').value;
        this.record.centerId = this.myForm.get('centerId').value;
        this.record.frientAccountNo1 = this.myForm.get('friendAccountNo1').value;
        this.record.friendAccountNo2 = this.myForm.get('friendAccountNo2').value;
        this.record.tazkiraNo = this.myForm.get('tazkiraNo').value;

        console.log("Form Data", this.record)
        this.spinner.show();
        this.agentService.create(this.record).subscribe((response) => {
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
        this.router.navigate(['/agent']);
    }
}
