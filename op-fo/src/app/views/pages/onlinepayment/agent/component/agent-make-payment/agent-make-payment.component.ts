import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, AfterViewInit, Output, Input, EventEmitter, Inject, } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { PagesService } from 'app/views/pages/pages.service';
import { LayoutUtilsService } from 'app/core/_base/crud';
import { AgentService } from '../../service/agent.service';
import { Province } from '../../../province/model/province.model';
import { ProvinceService } from '../../../province/service/province.service';

@Component({
  selector: 'kt-agent-make-payment',
  templateUrl: './agent-make-payment.component.html',
  styleUrls: ['./agent-make-payment.component.scss']
})
export class AgentMakePaymentComponent implements OnInit {

  @ViewChild('wizard', { static: true }) el: ElementRef;

	hasFormErrors: boolean = false;

	myForm: FormGroup;
	isLoading = false;
	passwordMatch: boolean;

	submitted = false;
	items: any;
	years: any[];
	provinces: any[];

	constructor(private formBuilder: FormBuilder,
		private layoutUtilService: LayoutUtilsService,
		private router: Router,
		public keycloakService: KeycloakService,
		private spinner: NgxSpinnerService,
		private agentService: AgentService,
    private provinceService: ProvinceService,
    private pagesService: PagesService

	) {
		// if (!this.keycloakService.isUserInRole('agent_credit')) {
		// 	this.router.navigate(['/']);
		// }
	}


	ngOnInit() {


		this.provinceService.get().subscribe(data => {
            this.provinces = data;
		});
		
	
		this.myForm = this.formBuilder.group({
			amount: ['', [Validators.required]],
			firstname: ['', [Validators.required]],
			lastname: ['', [Validators.required]],
			jReferenceNo: ['', [Validators.required]],
			accountNumber: ['', [Validators.required]],
			rjDate: [this.pagesService.getCurrentJalaliDate(), [Validators.required]],
			province: ['', [Validators.required]],
			offlineCollectionDate: [this.pagesService.getCurrentJalaliDate(), [Validators.required]],
			rjReason: ['', [Validators.required]],
			rjType: ['', [Validators.required]]
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
		const data = this.myForm.value;
		console.log("Form Data", data)

		 this.spinner.show();
        this.agentService.makeAgentPayment(data).subscribe(
            response => {
                this.spinner.hide();
                this.myForm.reset()
                const msg = 'Payment has been made!';
                this.layoutUtilService.showActionNotification(msg);
            },
            err => {
                this.spinner.hide();
                const msg = 'There is no agent with this id';
                this.layoutUtilService.showActionNotification(msg);
            }
        );
	}

	routeHome() {
	}


	 showAgentDetails() {
		const accountNumber = this.myForm.get('accountNumber').value;
		
		console.log("AccountNumber", accountNumber);
		
        this.spinner.show();
        this.agentService.loadByAccountNo(accountNumber).subscribe(
            response => {
                this.spinner.hide();
                if (response != null) {
                    this.myForm.patchValue({
                        firstname: response.firstname,
                        lastname: response.lastname,
                        // balance: 0
                    });
                    this.myForm.updateValueAndValidity();
                } else {
                    const msg = 'There is no agent with this account number';
                    this.layoutUtilService.showActionNotification(msg);
                }

            },
            err => {
                this.spinner.hide();
                const msg = 'There is no agent with this id';
                this.layoutUtilService.showActionNotification(msg);
            }
        );

    }

}
