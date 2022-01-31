import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { MatTableDataSource } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgentService } from 'app/views/pages/onlinepayment/agent/service/agent.service';

@Component({
  selector: 'kt-generate-statement',
  templateUrl: './generate-statement.component.html',
  styleUrls: ['./generate-statement.component.scss']
})
export class GenerateStatementComponent implements OnInit {
  model: any = {
    accountNo: null,
}

searchResult$;
displayedColumns = ['billNo', 'billDate', 'billAmount', 'numberOfItems', 'receiptNo', 'confirmed', 'confirmDate', 'confirmUserName'];
dataSource = new MatTableDataSource();
balance: any;

constructor(
    private agentService: AgentService,
    private cdrf: ChangeDetectorRef,
    private router: Router,
    private keycloakService: KeycloakService,
    private spinner: NgxSpinnerService
) {
    // if (!this.keycloakService.isUserInRole('payments_balancesheet')) {
    //     this.router.navigate(['/'])
    // }
}

ngOnInit() {
  this.searchBalanceSheet()
 }



searchBalanceSheet() {
    this.spinner.show();
    this.agentService.getUserBillStatement().subscribe(res => {
      console.log("Statements", res);
      
        this.spinner.hide();
        // this.searchResult$ = res;
        this.dataSource.data = res;
        this.cdrf.detectChanges();
    }, (err) => {
        this.spinner.hide();
    });
}
}
