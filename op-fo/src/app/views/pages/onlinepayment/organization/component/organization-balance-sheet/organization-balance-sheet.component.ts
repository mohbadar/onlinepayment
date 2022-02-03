import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { MatTableDataSource } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrganizationService } from '../../service/organization.service';


@Component({
  selector: 'kt-organization-balance-sheet',
  templateUrl: './organization-balance-sheet.component.html',
  styleUrls: ['./organization-balance-sheet.component.scss']
})
export class OrganizationBalanceSheetComponent implements OnInit {

  model: any = {
    accountNo: null,
}

searchResult$;
displayedColumns = ['credit', 'debit', 'balDate'];
dataSource = new MatTableDataSource();
balance: any;

constructor(
    private organizationService: OrganizationService,
    private cdrf: ChangeDetectorRef,
    private router: Router,
    private keycloakService: KeycloakService,
    private spinner: NgxSpinnerService
) {
    // if (!this.keycloakService.isUserInRole('payments_balancesheet')) {
    //     this.router.navigate(['/'])
    // }
}

ngOnInit() { }

checkForm() {
    return this.model.accountNo == null;
}

searchBalanceSheet() {
    this.spinner.show();
    this.organizationService.getBalanceSheet(this.model.accountNo).subscribe(res => {
        this.spinner.hide();
        this.searchResult$ = res;
        this.dataSource.data = res['ledgers'];
        this.balance  = res.balance;
        this.cdrf.detectChanges();
    });
}
}
