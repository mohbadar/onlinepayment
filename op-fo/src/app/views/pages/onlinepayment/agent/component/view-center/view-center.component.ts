
import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, Output, Input, EventEmitter, Inject, } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LayoutUtilsService, MessageType } from '../../../../../../core/_base/crud';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Center } from '../../model/center.model';
import { CenterService } from '../../service/center.service';

@Component({
    selector: 'kt-view-center',
    templateUrl: './view-center.component.html',
})
export class ViewCenterComponent implements OnInit {

    item: Center;
    isLoading = false;
    readonly = true;
    hasFormErrors: boolean = false;
    loadingAfterSubmit: boolean = false;
    viewLoading: boolean = false;
    revisions;

    constructor(
        private service: CenterService,
        private layoutUtilService: LayoutUtilsService,
        public dialogRef: MatDialogRef<ViewCenterComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {

        this.item = this.data.item;
        console.log("Item", this.item);

    }

    ngOnInit() {
        this.getRevisions();

    }

    getRevisions() {
        this.service.getRevisions(this.item.id).subscribe((data) => {
            console.log("Revisions: ", data);
            this.revisions = data.revisions;
        });
    }

    processStatus(status) {
        if (status == true) {
            return "Deleted"
        }
    }

}
