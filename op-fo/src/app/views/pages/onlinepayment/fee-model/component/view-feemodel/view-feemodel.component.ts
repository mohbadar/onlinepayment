
import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, Output, Input, EventEmitter, Inject, } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LayoutUtilsService, MessageType } from '../../../../../../core/_base/crud';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FeeModelService } from '../../service/fee-model.service';
import { FeeModel } from '../../model/feemodel.model';

@Component({
  selector: 'kt-view-feemodel',
  templateUrl: './view-feemodel.component.html',
  styleUrls: ['./view-feemodel.component.scss']
})
export class ViewFeemodelComponent implements OnInit {

    item: FeeModel;
    isLoading = false;
    readonly = true;
    hasFormErrors: boolean = false;
    loadingAfterSubmit: boolean = false;
    viewLoading: boolean = false;
    revisions;

    constructor(
        private service: FeeModelService,
        private layoutUtilService: LayoutUtilsService,
        public dialogRef: MatDialogRef<ViewFeemodelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {

        this.item = this.data.item;
        console.log("Item", this.item);

    }

    ngOnInit() {
        this.getRevisions();

    }

    getRevisions() {
        // this.service.getRevisions(this.item.id).subscribe((data) => {
        //     console.log("Revisions: ", data);
        //     this.revisions = data.revisions;
        // });
    }

    processStatus(status) {
        if (status == true) {
            return "Deleted"
        }
    }

}
