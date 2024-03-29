import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { MatTableDataSource } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgentService } from '../../service/agent.service';
import { LayoutUtilsService } from 'app/core/_base/crud';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'kt-agent-balance-sheet',
  templateUrl: './agent-balance-sheet.component.html',
  styleUrls: ['./agent-balance-sheet.component.scss']
})
export class AgentBalanceSheetComponent implements OnInit {

model: any = {
    accountNo: null,
}

searchResult$;
displayedColumns = ['credit', 'debit', 'balDate'];
dataSource = new MatTableDataSource();
balance: any;

constructor(
    private agentService: AgentService,
    private cdrf: ChangeDetectorRef,
    private router: Router,
    private keycloakService: KeycloakService,
    private spinner: NgxSpinnerService,
    private layoutsUtilService: LayoutUtilsService,
    private translate: TranslateService
) {
    if (!this.keycloakService.isUserInRole('agent_balance_sheet')) {
        this.router.navigate(['/'])
        this.layoutsUtilService.showActionNotification(this.translate.instant('UN_AUTHORIZED_ACCESS'));
    }
}

ngOnInit() { }

checkForm() {
    return this.model.accountNo == null;
}

searchBalanceSheet() {
    this.spinner.show();
    this.agentService.getBalanceSheet(this.model.accountNo).subscribe(res => {
        this.spinner.hide();
        this.searchResult$ = res;
        this.dataSource.data = res['ledgers'];
        this.balance  = res.balance;
        this.cdrf.detectChanges();
    }, (err)=> {
        this.spinner.hide();
    });
}
}
