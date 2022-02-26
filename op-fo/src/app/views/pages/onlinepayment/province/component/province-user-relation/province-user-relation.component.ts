import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LayoutUtilsService, MessageType } from 'app/core/_base/crud';
import { PagesService } from 'app/views/pages/pages.service';
import { KeycloakService } from 'keycloak-angular';
import { ProvinceUserRelation } from '../../model/province-user-relation.mode';
import { ProvinceService } from '../../service/province.service';

@Component({
    selector: 'kt-province-user-relation',
    templateUrl: './province-user-relation.component.html',
    styleUrls: ['./province-user-relation.component.scss']
})
export class ProvinceUserRelationComponent implements OnInit {
    item: any;
    eBreshnaForm: FormGroup;
    userMasters: any;


    constructor(
        private provinceService: ProvinceService,
        public dialogRef: MatDialogRef<ProvinceUserRelationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private layoutUtilService: LayoutUtilsService,
        private pagesService: PagesService,
        private keycloakService: KeycloakService,
        private router: Router,
        private translate: TranslateService
    ) { 
        if (!this.keycloakService.isUserInRole('province_user_relation')) {
            this.router.navigate(['/'])
            this.layoutUtilService.showActionNotification(this.translate.instant('UN_AUTHORIZED_ACCESS'));
        }
    }

    ngOnInit() {

        this.item = this.data.item;
        this.userMasters = this.provinceService.getUsers();
        this.eBreshnaForm = this.formBuilder.group({
            userId: ['', Validators.required]
        });

    }


    submit() {
        let record = new ProvinceUserRelation;
        record.userIds = this.eBreshnaForm.get('userId').value;
        record.provinceId = this.item.id;

        console.log("Form data:", record);
        this.provinceService.createProvinceUserRelation(record).subscribe((response) => {
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