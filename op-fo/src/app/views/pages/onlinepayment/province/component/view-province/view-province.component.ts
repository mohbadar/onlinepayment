
import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, Output, Input, EventEmitter, Inject, } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LayoutUtilsService, MessageType } from '../../../../../../core/_base/crud';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Province } from '../../model/province.model';
import { ProvinceService } from '../../service/province.service';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'kt-view-province',
    templateUrl: './view-province.component.html',
})
export class ViewProvinceComponent implements OnInit {

    item: Province;
    isLoading = false;
    readonly = true;
    hasFormErrors: boolean = false;
    loadingAfterSubmit: boolean = false;
    viewLoading: boolean = false;
    revisions;

    constructor(
        private service: ProvinceService,
        private provinceService: ProvinceService,
        private layoutUtilService: LayoutUtilsService,
        public dialogRef: MatDialogRef<ViewProvinceComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private keycloakService: KeycloakService,
        private router: Router,
        private translate: TranslateService
    ) {
        if (!this.keycloakService.isUserInRole('view_province')) {
            this.router.navigate(['/'])
            this.layoutUtilService.showActionNotification(this.translate.instant('UN_AUTHORIZED_ACCESS'));
        }

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
