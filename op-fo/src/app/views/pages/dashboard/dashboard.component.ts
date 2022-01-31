// Angular
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
// Lodash
import { shuffle } from 'lodash';
// Services
// Widgets model
import { LayoutConfigService, SparklineChartOptions } from '../../../core/_base/layout';
import { Widget4Data } from '../../partials/content/widgets/widget4/widget4.component';
import { TestService } from '../../../core/service/test.service';

// Angular
import { } from '@angular/core';
// RxJS
import { Subscription } from 'rxjs';
import { Breadcrumb, SubheaderService } from '../../../core/_base/layout/services/subheader.service';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
// Layout

@Component({
    selector: 'kt-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

    // Public properties
    // @Input() fluid: boolean;
    // @Input() clear: boolean;

    fluid = true;
    clear = true;
    today: number = Date.now();
    title: string = '';
    desc: string = '';
    breadcrumbs: Breadcrumb[] = [];


    centeruser_modules = [
        {
            id: 1,
            name: 'ISSUE_BILL',
            translate: 'ISSUE_BILL',
            icon: 'eConfiguration.svg',
            link: '/center/issue-bill'
        }, 
        {
            id: 2,
            name: 'Confirm Bill Payment',
            translate: 'CONFIRM_BILL_PAYMENT',
            icon: 'eCustomerService.svg',
            link: '/center/confirm-bill-payment'
        }, 

         {
            id: 3,
            name: 'Statement',
            icon: 'eAudit.svg',
            link: '/center/user-statement',
            translate: 'STATEMENT'
        }, 
        
    ]



    agentuser_modules = [
        {
            id: 1,
            name: 'AGENT_BILL_PAYMENT',
            translate: 'AGENT_BILL_PAYMENT',
            icon: 'eConfiguration.svg',
            link: '/agent/bill-payment'
        }, 
        {
            id: 2,
            name: 'AGENT_SLIP_PRINT',
            translate: 'AGENT_SLIP_PRINT',
            icon: 'eCustomerService.svg',
            link: '/agent/slip-print'
        }, 

         {
            id: 3,
            name: 'AGENT_BALANCE_SHEET',
            icon: 'eAudit.svg',
            link: '/agent/agent-balance-sheet',
            translate: 'BALANCE_SHEET'
        }, 
        
    ]


    administration_modules = [
        {
            id: 1,
            name: 'PROVINCE',
            translate: 'MENU.PROVINCE',
            icon: 'eConfiguration.svg',
            link: '/province'
        }, 
        {
            id: 2,
            name: 'MENU.ORGANIZATION',
            translate: 'MENU.ORGANIZATION',
            icon: 'eCustomerService.svg',
            link: '/organization'
        }, 

         {
            id: 3,
            name: 'MENU.CENTER',
            icon: 'eAudit.svg',
            link: '/center',
            translate: 'MENU.CENTER'
        }, 

        {
            id: 4,
            name: 'MENU.AGENT',
            icon: 'eAudit.svg',
            link: '/agent',
            translate: 'MENU.AGENT'
        }, 


        {
            id: 3,
            name: 'MENU.CREDIT_AGENT',
            icon: 'eAudit.svg',
            link: '/agent/credit',
            translate: 'MENU.CREDIT_AGENT'
        }, 


        {
            id: 5,
            name: 'MENU.DEBIT_AGENT',
            icon: 'eAudit.svg',
            link: '/agent/debit',
            translate: 'MENU.DEBIT_AGENT'
        }, 

        {
            id: 6,
            name: 'MENU.BILLTYPE',
            icon: 'eAudit.svg',
            link: '/bill-type',
            translate: 'MENU.BILLTYPE'
        }, 

        {
            id: 7,
            name: 'MENU.FEE_MODEL',
            icon: 'eAudit.svg',
            link: '/fee-model',
            translate: 'MENU.FEE_MODEL'
        },

        
        
    ]
    // Private properties
    private subscriptions: Subscription[] = [];
    modules: { id: number; name: string; translate: string; icon: string; link: string; }[];

	/**
	 * Component constructor
	 *
	 * @param subheaderService: SubheaderService
	 */
    constructor(public subheaderService: SubheaderService, 
        private translate: TranslateService,
        private keycloakService: KeycloakService) {
    }

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
    ngOnInit() {

        if(this.keycloakService.isUserInRole("agent_module_view")){
            this.modules = this.agentuser_modules;
        }
        
        if(this.keycloakService.isUserInRole("organization_user_module_view")){
            this.modules = this.centeruser_modules;
        }

        if(this.keycloakService.isUserInRole("administration_module_view")){
            this.modules = this.administration_modules;
        }
    }

	/**
	 * After view init
	 */
    ngAfterViewInit(): void {
        this.subscriptions.push(this.subheaderService.title$.subscribe(bt => {
            // breadcrumbs title sometimes can be undefined
            if (bt) {
                Promise.resolve(null).then(() => {
                    this.title = bt.title;
                    this.desc = bt.desc;
                });
            }
        }));

        this.subscriptions.push(this.subheaderService.breadcrumbs$.subscribe(bc => {
            Promise.resolve(null).then(() => {
                this.breadcrumbs = bc;
            });
        }));
    }

	/**
	 * On destroy
	 */
    ngOnDestroy(): void {
        this.subscriptions.forEach(sb => sb.unsubscribe());
    }


    // chartOptions1: SparklineChartOptions;
    // chartOptions2: SparklineChartOptions;
    // chartOptions3: SparklineChartOptions;
    // chartOptions4: SparklineChartOptions;
    // widget4_1: Widget4Data;
    // widget4_2: Widget4Data;
    // widget4_3: Widget4Data;
    // widget4_4: Widget4Data;

    // constructor(private layoutConfigService: LayoutConfigService, private testService: TestService) {

    // 	this.testService.testApi().subscribe(res => {
    // 		console.log("Response of TestAPI", res);

    // 	});
    // }

    // ngOnInit(): void {
    // 	this.chartOptions1 = {
    // 		data: [10, 14, 18, 11, 9, 12, 14, 17, 18, 14],
    // 		color: this.layoutConfigService.getConfig('colors.state.brand'),
    // 		border: 3
    // 	};
    // 	this.chartOptions2 = {
    // 		data: [11, 12, 18, 13, 11, 12, 15, 13, 19, 15],
    // 		color: this.layoutConfigService.getConfig('colors.state.danger'),
    // 		border: 3
    // 	};
    // 	this.chartOptions3 = {
    // 		data: [12, 12, 18, 11, 15, 12, 13, 16, 11, 18],
    // 		color: this.layoutConfigService.getConfig('colors.state.success'),
    // 		border: 3
    // 	};
    // 	this.chartOptions4 = {
    // 		data: [11, 9, 13, 18, 13, 15, 14, 13, 18, 15],
    // 		color: this.layoutConfigService.getConfig('colors.state.primary'),
    // 		border: 3
    // 	};

    // 	// @ts-ignore
    // 	this.widget4_1 = shuffle([
    // 		{
    // 			pic: './assets/media/files/doc.svg',
    // 			title: 'Metronic Documentation',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 		}, {
    // 			pic: './assets/media/files/jpg.svg',
    // 			title: 'Project Launch Evgent',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 		}, {
    // 			pic: './assets/media/files/pdf.svg',
    // 			title: 'Full Developer Manual For 4.7',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 		}, {
    // 			pic: './assets/media/files/javascript.svg',
    // 			title: 'Make JS Development',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 		}, {
    // 			pic: './assets/media/files/zip.svg',
    // 			title: 'Download Ziped version OF 5.0',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 		}, {
    // 			pic: './assets/media/files/pdf.svg',
    // 			title: 'Finance Report 2016/2017',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 		},
    // 	]);
    // 	// @ts-ignore
    // 	this.widget4_2 = shuffle([
    // 		{
    // 			pic: './assets/media/users/100_4.jpg',
    // 			username: 'Anna Strong',
    // 			desc: 'Visual Designer,Google Inc.',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 			buttonClass: 'btn-label-brand'
    // 		}, {
    // 			pic: './assets/media/users/100_14.jpg',
    // 			username: 'Milano Esco',
    // 			desc: 'Product Designer, Apple Inc.',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 			buttonClass: 'btn-label-warning'
    // 		}, {
    // 			pic: './assets/media/users/100_11.jpg',
    // 			username: 'Nick Bold',
    // 			desc: 'Web Developer, Facebook Inc.',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 			buttonClass: 'btn-label-danger'
    // 		}, {
    // 			pic: './assets/media/users/100_1.jpg',
    // 			username: 'Wilter Delton',
    // 			desc: 'Project Manager, Amazon Inc.',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 			buttonClass: 'btn-label-success'
    // 		}, {
    // 			pic: './assets/media/users/100_5.jpg',
    // 			username: 'Nick Stone',
    // 			desc: 'Visual Designer, Github Inc.',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 			buttonClass: 'btn-label-dark'
    // 		},
    // 	]);
    // 	// @ts-ignore
    // 	this.widget4_3 = shuffle([
    // 		{
    // 			icon: 'flaticon-pie-chart-1 kt-font-info',
    // 			title: 'Metronic v6 has been arrived!',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 			value: '+$500',
    // 			valueColor: 'kt-font-info'
    // 		}, {
    // 			icon: 'flaticon-safe-shield-protection kt-font-success',
    // 			title: 'Metronic community meet-up 2019 in Rome.',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 			value: '+$1260',
    // 			valueColor: 'kt-font-success'
    // 		}, {
    // 			icon: 'flaticon2-line-chart kt-font-danger',
    // 			title: 'Metronic Angular 8 version will be landing soon..',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 			value: '+$1080',
    // 			valueColor: 'kt-font-danger'
    // 		}, {
    // 			icon: 'flaticon2-pie-chart-1 kt-font-primary',
    // 			title: 'ale! Purchase Metronic at 70% off for limited time',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 			value: '70% Off!',
    // 			valueColor: 'kt-font-primary'
    // 		}, {
    // 			icon: 'flaticon2-rocket kt-font-brand',
    // 			title: 'Metronic VueJS version is in progress. Stay tuned!',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 			value: '+134',
    // 			valueColor: 'kt-font-brand'
    // 		}, {
    // 			icon: 'flaticon2-notification kt-font-warning',
    // 			title: 'Black Friday! Purchase Metronic at ever lowest 90% off for limited time',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 			value: '70% Off!',
    // 			valueColor: 'kt-font-warning'
    // 		}, {
    // 			icon: 'flaticon2-file kt-font-focus',
    // 			title: 'Metronic React version is in progress.',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 			value: '+13%',
    // 			valueColor: 'kt-font-focus'
    // 		},
    // 	]);
    // 	// @ts-ignore
    // 	this.widget4_4 = shuffle([
    // 		{
    // 			pic: './assets/media/client-logos/logo5.svg',
    // 			title: 'Trump Themes',
    // 			desc: 'Make Metronic Development',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 			value: '+$2500',
    // 			valueColor: 'kt-font-brand'
    // 		}, {
    // 			pic: './assets/media/client-logos/logo4.svg',
    // 			title: 'StarBucks',
    // 			desc: 'Good Coffee & Snacks',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 			value: '-$290',
    // 			valueColor: 'kt-font-brand'
    // 		}, {
    // 			pic: './assets/media/client-logos/logo3.svg',
    // 			title: 'Phyton',
    // 			desc: 'A Programming Language',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 			value: '+$17',
    // 			valueColor: 'kt-font-brand'
    // 		}, {
    // 			pic: './assets/media/client-logos/logo2.svg',
    // 			title: 'GreenMakers',
    // 			desc: 'Make Green Development',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 			value: '-$2.50',
    // 			valueColor: 'kt-font-brand'
    // 		}, {
    // 			pic: './assets/media/client-logos/logo1.svg',
    // 			title: 'FlyThemes',
    // 			desc: 'A Let\'s Fly Fast Again Language',
    // 			url: 'https://keenthemes.com.my/metronic',
    // 			value: '+200',
    // 			valueColor: 'kt-font-brand'
    // 		},
    // 	]);
    // }
}
