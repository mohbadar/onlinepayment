import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExcelService } from 'app/core/service/excel.service';
import { LayoutUtilsService } from 'app/core/_base/crud';
import { PagesService } from 'app/views/pages/pages.service';
import { KeycloakService } from 'keycloak-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { CenterService } from '../../../center/service/center.service';
import { OrganizationService } from '../../../organization/service/organization.service';
import { OrganizationAdminService } from '../../service/organization-admin.service';


@Component({
  selector: 'kt-generate-date-based-statement',
  templateUrl: './generate-date-based-statement.component.html',
  styleUrls: ['./generate-date-based-statement.component.scss']
})
export class GenerateDateBasedStatementComponent implements OnInit {


  searchForm: FormGroup;
  result: boolean = false;

  statuses = [
    { id: 'CONFIRMED', name: 'CONFIRMED' },
    { id: 'NOT_CONFIRMED', name: 'NOT_CONFIRMED' },
  ];
  organizations$: Observable<any>;
  centers$: Observable<any>;


  constructor(
    private formBuilder: FormBuilder,
    private layoutUtilsService: LayoutUtilsService,
    private pagesService: PagesService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private excelService: ExcelService,
    public keycloakService: KeycloakService,
    private router: Router,
    private layoutUtilService: LayoutUtilsService,
    private organizationService: OrganizationService,
    private centerService: CenterService,
    private organizationAdminService: OrganizationAdminService
  ) {
    // if (!this.keycloakService.isUserInRole('reporting_arrear_report')) {
    //   this.router.navigate(['/'])
    // }
  }

  ngOnInit(): void {

    this.organizations$ = this.organizationService.get();
    this.centers$ = this.centerService.get();

    this.searchForm = this.formBuilder.group({
      organizationId: [null, [Validators.required]],
      centerId: [null, [Validators.required]],
      startDate: [, [Validators.required]],
      endDate: [, [Validators.required]],
      status: [null, [Validators.required]]
    });
  }


  onSubmit() {

    const dto = {
      organizationId: this.searchForm.get('organizationId').value,
      centerId: this.searchForm.get('centerId').value,
      startDate: this.searchForm.get('startDate').value,
      endDate: this.searchForm.get('endDate').value,
      status: this.searchForm.get('status').value
    };


    this.spinner.show();
    this.organizationAdminService
      .getDateBasedReport(dto)
      .subscribe((response: any) => {
        this.spinner.hide();
        console.log("Reports> ", response);
        // this.excelService.exportAsExcelFile(response, 'bank_branch_collection_reports_');
        if (response.length > 0) {
          this.excelService.exportAsExcelFile(response, 'statement_');
          const msg = 'Report successfully generated!';
          this.layoutUtilService.showActionNotification(msg);
        } else {
          const msg = 'Not found!';
          this.layoutUtilService.showActionNotification(msg);
        }
        this.cdr.detectChanges();
        this.result = true;
        // this.routeHome();
        this.spinner.hide();
      }, (err) => {
        const msg = 'There was an error. Please Contact your admin';
        this.spinner.hide();
        this.layoutUtilsService.showActionNotification(msg);
      }

      );

  }


  // loadBranches(event) {
  //   this.bankBranchs = this.pagesService.getBankBranches(event.id);
  // }

  resetForm() {
    this.searchForm.reset();
    this.result = false;
  }

}