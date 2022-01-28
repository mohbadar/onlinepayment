import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LayoutUtilsService, MessageType } from 'app/core/_base/crud';
import { PagesService } from 'app/views/pages/pages.service';
import { CenterUserRelation } from '../../model/center-user-relation.mode';
import { CenterService } from '../../service/center.service';

@Component({
    selector: 'kt-center-user-relation',
    templateUrl: './center-user-relation.component.html',
})
export class CenterUserRelationComponent implements OnInit {
    item: any;
    eBreshnaForm: FormGroup;
    userMasters: any;


    constructor(
        private centerService: CenterService,
        public dialogRef: MatDialogRef<CenterUserRelationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private layoutUtilService: LayoutUtilsService,
        private pagesService: PagesService,
    ) { }

    ngOnInit() {

        this.item = this.data.item;
        this.userMasters = this.centerService.getUsers();
        this.eBreshnaForm = this.formBuilder.group({
            userId: ['', Validators.required]
        });

    }


    submit() {
        let record = new CenterUserRelation;
        record.userIds = this.eBreshnaForm.get('userId').value;
        record.centerId = this.item.id;

        console.log("Form data:", record);
        this.centerService.createCenterUserRelation(record).subscribe((response) => {
            this.eBreshnaForm.reset();
            this.dialogRef.close();
            const _createMessage = `Object has been registered!`;
            this.layoutUtilService.showActionNotification(_createMessage, MessageType.Create);
        }, (err) => {
            const msg = 'There was an error creating';
            this.layoutUtilService.showActionNotification(msg);

        });
    }





}