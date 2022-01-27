import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatDialog } from "@angular/material";
import { MatTableDataSource } from "@angular/material/table";
import { DataExchangeService } from "app/core/service/data.exchange.service";
import { merge, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";

import { KeycloakService } from "keycloak-angular";
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LayoutUtilsService, MessageType } from "app/core/_base/crud";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { PdaService } from "../../service/pda.service";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "kt-verify-document",
  templateUrl: "./verify-document.component.html",
  styleUrls: ["./verify-document.component.scss"],
})
export class VerifyDocumentComponent implements OnInit {
  displayedColumns: string[] = [
    "nidFamilyNo",
    "onlineFormFamilyNo",
    "docOriginalName",
    "docNumOfPages",
    "actions",
  ];
  dataSource: MatTableDataSource<any>;
  pageSize = 10;
  resultLength = 0;
  pageIndex = 0;
  record: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  form: FormGroup;

  verification_types = [
    { id: "CENTER", name: "CENTER" },
    { id: "ALL", name: "ALL" },
  ];
  is_center_based: boolean;
  is_docs_available: boolean;
  unverified_list: any;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    public keycloakService: KeycloakService,
    private layoutUtilService: LayoutUtilsService,
    private pdaService: PdaService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    if (!this.keycloakService.isUserInRole("pda_verify_document")) {
      const message = "You are not authorized to access this component";
      this.layoutUtilService.showActionNotification(message);
      this.router.navigateByUrl("/");
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      verification_type: [null, [Validators.required]],
      center_code: [, []],
    });

    this.dataSource = new MatTableDataSource();
  }

  setViewData(data) {
    this.unverified_list = data;
    this.dataSource.data = this.unverified_list;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  submit() {
    let httpParams = new HttpParams()
      .append("verification_type", this.form.get("verification_type").value)
      .append("center_code", this.form.get("center_code").value);

    this.record = this.form.value;
    // const formData = new FormData();
    // // this.record = this.myForm.value;
    // formData.append(
    //   "verification_type",
    //   this.form.get("verification_type").value
    // );
    // formData.append("center_code", this.form.get("center_code").value);

    console.log("formDATAAA", httpParams);

    this.spinner.show();
    this.pdaService.getUnVerifiedDocs(httpParams).subscribe(
      (response) => {
        console.log(response);

        this.resetForm();
        this.spinner.hide();
        this.is_docs_available = true;
        this.setViewData(response.data);
      },
      (err) => {
        const msg =
          "There was an un-expected situation while processing your request. Please contact your admin";
        this.spinner.hide();
        this.layoutUtilService.showActionNotification(msg);
      }
    );
  }

  resetForm() {
    this.form.reset();
  }

  /**
   * Redirect to home page
   */
  routeHome() {
    this.location.back();
  }

  setVerificationType(event) {
    console.log(event);
    if (event.id == this.verification_types[0].id) {
      this.is_center_based = true;
      this.form.controls.center_code.setValidators(null);
      this.form.controls.center_code.setValidators([Validators.required]);
      this.form.controls.center_code.updateValueAndValidity();
    } else {
      this.is_center_based = false;
      this.form.controls.center_code.setValidators(null);
      this.form.controls.center_code.updateValueAndValidity();
    }
  }

  verify(_item, index) {
    const _title: string = "PDA";
    const _description: string = "Are you sure to verify?";
    const _waitDesciption: string = "Verifying...";
    const _deleteMessage = `Object has been verified`;

    const dialogRef = this.layoutUtilService.deleteElement(
      _title,
      _description,
      _waitDesciption
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }

      this.pdaService.verify(_item.id).subscribe((response) => {
        this.layoutUtilService.showActionNotification(
          _deleteMessage,
          MessageType.Delete
        );
        this.removeItem(index);
      });
    });
  }

  removeItem(index) {
    this.unverified_list.splice(index, 1);
    this.updateDataSource();
  }

  updateDataSource() {
    this.dataSource.data = this.unverified_list;
  }
}
