
import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, Output, Input, EventEmitter, Inject, } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LayoutUtilsService, MessageType } from '../../../../../../core/_base/crud';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BillType } from '../../model/bill-type.model';
import { BillTypeService } from '../../service/bill-type.service';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-view-billtype',
  templateUrl: './view-billtype.component.html',
  styleUrls: ['./view-billtype.component.scss']
})
export class ViewBilltypeComponent implements OnInit {

  item: BillType;
  isLoading = false;
  readonly = true;
  hasFormErrors: boolean = false;
  loadingAfterSubmit: boolean = false;
  viewLoading: boolean = false;
  revisions;

  constructor(
      private service: BillTypeService,
      private layoutUtilService: LayoutUtilsService,
      public dialogRef: MatDialogRef<ViewBilltypeComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private keycloakService: KeycloakService,
      private router: Router,
      private translate: TranslateService
  ) {

      if (!this.keycloakService.isUserInRole('view_billtype')) {
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
