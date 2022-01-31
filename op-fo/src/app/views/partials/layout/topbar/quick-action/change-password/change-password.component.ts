import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'app/core/service/must-match';
import { UserManagementService } from 'app/core/service/user.management.service';
import { LayoutUtilsService, MessageType } from 'app/core/_base/crud';
// import { UserDTO } from 'app/views/pages/configuration/user-management/model/user.model';
// import { UserManagementService } from 'app/views/pages/configuration/user-management/service/user-management.service';
import { KeycloakService } from 'keycloak-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserDTO } from '../model/user.dto';

@Component({
  selector: 'kt-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  eBreshnaForm: FormGroup;
  record: UserDTO;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private layoutUtilService: LayoutUtilsService,
    private keycloakService: KeycloakService,
    private service: UserManagementService,
    private spinner: NgxSpinnerService,
    private router: Router,

  ) { }

  ngOnInit(): void {

    this.eBreshnaForm = this.formBuilder.group({
      username: [this.keycloakService.getUsername(), Validators.required],
      password: [, Validators.required],
      confirmPassword: [, Validators.required],
      // currentPassword: [, Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    }
    );

  }

  submit() {
    this.record = new UserDTO;
    this.record.username = this.eBreshnaForm.get('username').value;
    this.record.password = this.eBreshnaForm.get('password').value;
    // this.record.currentPassword = this.eBreshnaForm.get('currentPassword').value;

    console.log("formDate", this.record);
    this.spinner.show();
    this.service.saveNewPassword(this.record).subscribe((response) => {
      this.eBreshnaForm.reset({});
      const _createMessage = `Password has been changed!`;
      this.spinner.hide();
      this.layoutUtilService.showActionNotification(_createMessage, MessageType.Create);
      this.keycloakService.logout();
    }, (err) => {
      const msg = 'There was an un-expected situation while processing your request. Please contact your admin';
      this.spinner.hide();
      this.layoutUtilService.showActionNotification(msg);

    });
  }
}
