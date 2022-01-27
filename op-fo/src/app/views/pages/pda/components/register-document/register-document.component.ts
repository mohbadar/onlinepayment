import moment from "moment";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MessageType, LayoutUtilsService } from "app/core/_base/crud";
import { NgxSpinnerService } from "ngx-spinner";
import { PdaService } from "../../service/pda.service";
import { KeycloakService } from "keycloak-angular";
import { Router } from "@angular/router";
import { CustomValidator } from "./custom-validator";

@Component({
  selector: "kt-register-document",
  templateUrl: "./register-document.component.html",
  styleUrls: ["./register-document.component.scss"],
})
export class RegisterDocumentComponent implements OnInit {
  hasFormErrors: boolean = false;

  myForm: FormGroup;

  file: File;
  fileAdded: boolean;

  resultLoaded: boolean = false;
  filesStats;

  record: any = {};
  result: any;
  comparisonDataLoaded: boolean = false;
  pdfNoPages: any;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private layoutUtilService: LayoutUtilsService,
    private spinner: NgxSpinnerService,
    private pdaService: PdaService,
    public keycloakService: KeycloakService,
    private router: Router
  ) {
    if (!this.keycloakService.isUserInRole("pda_register_document")) {
      const message = "You are not authorized to access this component";
      this.layoutUtilService.showActionNotification(message);
      this.router.navigateByUrl("/");
    }
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      familyNo: [
        null,
        [
          Validators.required,
          CustomValidator.customPatternValid({
            pattern: "[0-9]{5}-[0-9]{2}-[0-9]{4}",
            msg: "Family Number is invalid",
          }),
        ],
      ],
      file: [
        null,
        [
          Validators.required,
          CustomValidator.validateFile({
            file: "pdf",
            msg: "Invalid file | Upload PDF File",
          }),
        ],
      ],
      onlineFormFamilyNo: [null, []],
    });
  }

  submit() {
    const formData = new FormData();
    // this.record = this.myForm.value;
    formData.append("familyNo", this.myForm.get("familyNo").value);
    formData.append(
      "onlineFormFamilyNo",
      this.myForm.get("onlineFormFamilyNo").value
    );
    formData.append("pdfNoPages", this.pdfNoPages);

    if (this.file) formData.append("file", this.file);

    console.log(formData);
    this.spinner.show();
    this.pdaService.store(formData).subscribe(
      (response) => {
        console.log("Response: ", response);
        this.spinner.hide();
        this.result = response;
        this.comparisonDataLoaded = true;

        this.myForm.reset();
        const msg = `Files are successfully processed!`;
        this.layoutUtilService.showActionNotification(msg, MessageType.Create);
        // this.routeHome();
      },
      (err) => {
        const msg =
          "There was an error in processing files: " + JSON.stringify(err);
        this.spinner.hide();
        this.layoutUtilService.showActionNotification(msg);
        console.log("err occured: ", err);
      }
    );
  }

  routeHome() {
    this.location.back();
  }

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.file = event.target.files[0];
      console.log("FileName: ", event.target.files[0]);

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (e) => {
        // called once readAsDataURL is completed
        this.fileAdded = true;
      };
    }
  }
}
