
import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, Output, Input, EventEmitter, Inject, } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LayoutUtilsService } from 'app/core/_base/crud';

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
    ) {

        this.item = this.data.item;
        console.log("Item", this.item);

    }

    ngOnInit() {

    }

    printBill(billId){
      console.log("Print Bill");
      
    }

  
  
}

