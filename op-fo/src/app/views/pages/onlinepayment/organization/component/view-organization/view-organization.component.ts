
import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, Output, Input, EventEmitter, Inject, } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LayoutUtilsService, MessageType } from '../../../../../../core/_base/crud';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Organization } from '../../model/organization.model';
import { OrganizationService } from '../../service/organization.service';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'kt-view-organization',
    templateUrl: './view-organization.component.html',
})
export class ViewOrganizationComponent implements OnInit {

    item: Organization;
    isLoading = false;
    readonly = true;
    hasFormErrors: boolean = false;
    loadingAfterSubmit: boolean = false;
    viewLoading: boolean = false;
    revisions;

    constructor(
        private service: OrganizationService,
        private layoutUtilService: LayoutUtilsService,
        public dialogRef: MatDialogRef<ViewOrganizationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private keycloakService: KeycloakService,
        private router: Router,
        private translate: TranslateService
    ) {

        if (!this.keycloakService.isUserInRole('view_organization')) {
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
