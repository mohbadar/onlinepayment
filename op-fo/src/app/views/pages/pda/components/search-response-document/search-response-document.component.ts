import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { Router } from "@angular/router";
import { LayoutUtilsService } from "app/core/_base/crud";
import { KeycloakService } from "keycloak-angular";
import { PdaService } from "../../service/pda.service";
import * as FileSaver from "file-saver";
import * as es6printJS from "print-js";
import * as printJS from "print-js";

@Component({
  selector: "kt-search-response-document",
  templateUrl: "./search-response-document.component.html",
  styleUrls: ["./search-response-document.component.scss"],
})
export class SearchResponseDocumentComponent implements OnInit {
  @Input() data;

  constructor(
    private cdref: ChangeDetectorRef,
    public dialog: MatDialog,
    private layoutUtilService: LayoutUtilsService,
    private pdaService: PdaService,
    public keycloakService: KeycloakService,
    private router: Router
  ) {
    if (!this.keycloakService.isUserInRole("pda_view_document")) {
      const message = "You are not authorized to access this component";
      this.layoutUtilService.showActionNotification(message);
      this.router.navigateByUrl("/");
    }
  }

  ngOnInit(): void {
    console.log("Data", this.data);
  }

  download(uuid) {
    // this.spinner.show();
    this.pdaService.download(uuid).subscribe(
      (response) => {
        // this.spinner.hide();

        // console.log(response)

        FileSaver.saveAs(response, `nid_processed_form.pdf`);
        // const blob = new Blob([response], { type: 'application/pdf' });
        // const url = window.URL.createObjectURL(blob);
        // window.open(url);
        const blob = new Blob([response], { type: "application/pdf" });
        const url = (window.URL ? URL : webkitURL).createObjectURL(blob);
        es6printJS(url);
      },
      (err) => {
        const msg =
          "There was an un-expected situation while processing your request. Please contact your admin";
        // this.spinner.hide();
        this.layoutUtilService.showActionNotification(msg);
      }
    );
  }
}
