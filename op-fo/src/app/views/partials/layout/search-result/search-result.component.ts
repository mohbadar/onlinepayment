// Angular
import { Route } from '@angular/compiler/src/core';
import { ChangeDetectorRef, Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataExchangeService } from 'app/core/service/data.exchange.service';
import { LayoutUtilsService } from 'app/core/_base/crud';
import { PagesService } from 'app/views/pages/pages.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LayoutService } from '../layout.service';

export interface ISearchResult {

	name: string;
	accountNo: string;
}

@Component({
	selector: 'kt-search-result',
	templateUrl: './search-result.component.html',
	styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {
	// Public properties
	@Input() data: ISearchResult[];
	@Input() noRecordText: string;

	searchRecord: any = {};
	consumersLoaded: boolean;
	consumers: any;

	constructor(
		private pagesService: PagesService,
		private spinner: NgxSpinnerService,
		private cdref: ChangeDetectorRef,
		private layoutUtilService: LayoutUtilsService,
		private service: LayoutService,
		private dataExchangService: DataExchangeService,
		private route: Router
	) { }

	ngOnInit() {
	}

	search() {
		this.searchRecord = { searchBy: "account_no", searchKey: this.data[0].accountNo };

		//console.log("AccNo:>>>>", this.searchRecord);
		this.spinner.show();
		this.consumersLoaded = false;
		this.service.searchCustomer(this.searchRecord).subscribe(response => {
			this.spinner.hide();
			if (response != null) {
				// this.consumersLoaded = true;
				// this.consumers = response;
				this.routeToConsumerSearch(response);
				this.cdref.detectChanges();
			} else {
				const msg = 'Could not find any results..';
				this.layoutUtilService.showActionNotification(msg);
			}
		},
			err => {
				const msg = 'There was an un-expected situation while processing your request. Please contact your admin';
				this.spinner.hide();
				this.layoutUtilService.showActionNotification(msg);
			}
		);
		console.log('searchRecord::>>', this.searchRecord);
	}


	routeToConsumerSearch(response) {
		console.log("response", response);

		this.dataExchangService.changeData(response);
		this.route.navigate(['/service-connection/consumer-search']);
	}
}
