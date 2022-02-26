import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LayoutUtilsService } from 'app/core/_base/crud';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'kt-agent-slip-print',
  templateUrl: './agent-slip-print.component.html',
  styleUrls: ['./agent-slip-print.component.scss']
})
export class AgentSlipPrintComponent implements OnInit {

    item: any;
    isPrinting = false;

    constructor(
        public dialogRef: MatDialogRef<AgentSlipPrintComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private keycloakService: KeycloakService,
        private router: Router,
        private layoutUtilService: LayoutUtilsService,
        private translate: TranslateService
    ) {

      if (!this.keycloakService.isUserInRole('agent_print_slip')) {
        this.router.navigate(['/'])
        this.layoutUtilService.showActionNotification(this.translate.instant('UN_AUTHORIZED_ACCESS'));
      }

        this.item = this.data.item;
        console.log("Item", this.item);
        this.isPrinting = true;
    }

    ngOnInit(): void {
    }

    //DABS361846
}
