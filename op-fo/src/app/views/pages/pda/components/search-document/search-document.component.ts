import moment from 'moment';
import { Observable } from 'rxjs';
import { Component, OnInit, ElementRef, ViewChild, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MessageType, LayoutUtilsService } from 'app/core/_base/crud';


import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { PdaService } from '../../service/pda.service';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';




@Component({
  selector: 'kt-search-document',
  templateUrl: './search-document.component.html',
  styleUrls: ['./search-document.component.scss']
})
export class SearchDocumentComponent implements OnInit {

  hasFormErrors: boolean = false;

  myForm: FormGroup;

  record: any = {};
  result: any;
  comparisonDataLoaded : boolean = false;
  isResponseAvailable: boolean;
  response: any;

  constructor(private formBuilder: FormBuilder,
      private location: Location,
      private layoutUtilService: LayoutUtilsService,
      private spinner: NgxSpinnerService,
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


  ngOnInit() {
      this.myForm = this.formBuilder.group({
          familyNo: [null,[Validators.required]],
      });
  }




  submit() {
      const formData = new FormData();
      // this.record = this.myForm.value;
      formData.append('familyNo', this.myForm.get('familyNo').value);

      console.log(formData);
      this.spinner.show();
      this.pdaService.search(this.myForm.get('familyNo').value).subscribe((response) => {
          console.log("Response: ", response);
          this.spinner.hide();
          this.result = response;
          this.comparisonDataLoaded = true;

          this.setResponse(response);
          // this.myForm.reset();
          const msg = `Files are successfully processed!`;
          this.layoutUtilService.showActionNotification(msg, MessageType.Create);
          // this.routeHome();
      }, (err) => {
          const msg = 'There was an error in processing files: '+ JSON.stringify(err);
          this.spinner.hide();
          this.layoutUtilService.showActionNotification(msg);
          console.log("err occured: ", err)
      });
  }

  routeHome() {
      this.location.back();
  }

  setResponse(response){
    this.isResponseAvailable = true;
    this.response= response;
  }
}
