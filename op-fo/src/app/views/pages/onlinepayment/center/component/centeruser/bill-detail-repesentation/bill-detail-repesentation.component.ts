
import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, Output, Input, EventEmitter, Inject, } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LayoutUtilsService } from 'app/core/_base/crud';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-bill-detail-repesentation',
  templateUrl: './bill-detail-repesentation.component.html',
  styleUrls: ['./bill-detail-repesentation.component.scss']
})
export class BillDetailRepesentationComponent implements OnInit {

    item: any;
    isLoading = false;
    readonly = true;
    hasFormErrors: boolean = false;
    loadingAfterSubmit: boolean = false;
    viewLoading: boolean = false;
    revisions;

    constructor(
        private layoutUtilService: LayoutUtilsService,
        public dialogRef: MatDialogRef<BillDetailRepesentationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private keycloakService: KeycloakService,
        private router: Router,
        private translate: TranslateService
    ) {

      if (!this.keycloakService.isUserInRole('bill_detail_representation')) {
        this.router.navigate(['/'])
        this.layoutUtilService.showActionNotification(this.translate.instant('UN_AUTHORIZED_ACCESS'));
      }

        this.item = this.data.item;
        console.log("Item", this.item);

    }

    ngOnInit() {

    }

    printBill(billId){
      console.log("Print Bill");
      
    }

  
  
}

