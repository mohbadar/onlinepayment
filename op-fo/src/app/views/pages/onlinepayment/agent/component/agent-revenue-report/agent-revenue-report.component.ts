
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgentService } from '../../service/agent.service';
import { SelectionModel } from '@angular/cdk/collections';
import { LayoutUtilsService, MessageType } from 'app/core/_base/crud';
import { ExcelService } from 'app/core/service/excel.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-agent-revenue-report',
  templateUrl: './agent-revenue-report.component.html',
  styleUrls: ['./agent-revenue-report.component.scss']
})
export class AgentRevenueReportComponent implements OnInit {

  displayedColumns: string[] = ['select', 'accountNumber', 'agentFee', 'feeDate', 'isCleared'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  selection: SelectionModel<any>;

  model: any = {
    accountNo: null,
  }

searchResult = [];
balance: any;
  result: boolean;

constructor(
    private agentService: AgentService,
    private cdrf: ChangeDetectorRef,
    private router: Router,
    private keycloakService: KeycloakService,
    private spinner: NgxSpinnerService,
    private layoutUtilService:LayoutUtilsService,
    private excelService: ExcelService,
    private translate: TranslateService
) {
  if (!this.keycloakService.isUserInRole('agent_revenue_report')) {
    this.router.navigate(['/'])
    this.layoutUtilService.showActionNotification(this.translate.instant('UN_AUTHORIZED_ACCESS'));
  }
}

ngOnInit() { }

checkForm() {
    return this.model.accountNo == null;
}

setDatatable(records) {
  const initialSelection = [];
  const allowMultiSelect = true;
  this.selection = new SelectionModel<any>(allowMultiSelect, initialSelection);
  this.dataSource = new MatTableDataSource(records);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
}
routeHome() {
    this.resetForm();
    this.result = false;
    this.dataSource.data = [];
    this.searchResult = [];
}


resetForm() {
  this.model.accountNo=null;
}

approveAgentFees(){

  const _title: string = 'Agent Fees Approval';
  const _description: string = 'Are You Sure?';
  const _waitDesciption: string = 'Approving ...';
  const _deleteMessage = `Fees have been approved`;


  const dialogRef = this.layoutUtilService.deleteElement(
      _title,
      _description,
      _waitDesciption
  );
  dialogRef.afterClosed().subscribe(res => {
      if (!res) {
          return;
      }
      this.sendApprovals();
  });

}



sendApprovals() {
  console.log(this.selection.selected);
  this.spinner.show();
  this.agentService.sendFeeApprovals(this.selection.selected).subscribe(
      response => {
          console.log('response: ', response);
          const _createMessage = `Fees have been approved!`;
          this.layoutUtilService.showActionNotification(
              _createMessage,
              MessageType.Create
          );
          this.spinner.hide();
          this.routeHome();
          this.resetForm();
      },
      err => {
          const msg = 'There was an error approving data';
          this.layoutUtilService.showActionNotification(msg);
          this.spinner.hide();
          this.routeHome();
      });
}

rejectAgentFees(){}




searchAgentFees() {
    this.spinner.show();
    this.agentService.getAgentFees(this.model.accountNo).subscribe(  response => {
      console.log('response: ', response);
      this.spinner.hide();
      this.searchResult = response;
      this.setDatatable(response);
      this.result = true;
  },
  err => {
      this.spinner.hide();
      const msg = 'There was an error fetching data';
      this.layoutUtilService.showActionNotification(msg);
  });
}


exportAgentFees(){
  this.spinner.show();
  this.agentService.getAgentFees(this.model.accountNo).subscribe(  response => {
        this.spinner.hide();
        if (response.length > 0) {
          this.excelService.exportAsExcelFile(response, 'agent_revenue_');
          const msg = 'Report successfully generated!';
          this.layoutUtilService.showActionNotification(msg);
        } else {
          const msg = 'Not found!';
          this.layoutUtilService.showActionNotification(msg);
        }

    },
    err => {
        this.spinner.hide();
        const msg = 'There was an error fetching data';
        this.layoutUtilService.showActionNotification(msg);
    });
}
}
