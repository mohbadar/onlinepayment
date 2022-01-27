// Angular
import { Component, HostBinding, OnInit, Input } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { KeycloakService } from 'keycloak-angular';
import { LayoutUtilsService, MessageType } from 'app/core/_base/crud';

// RxJS
import { filter } from "rxjs/operators";
// Translate
import { TranslationService } from "../../../../../core/_base/layout";

@Component({
  selector: 'kt-tenant-selector',
  templateUrl: './tenant-selector.component.html',
  styleUrls: ['./tenant-selector.component.scss']
})
export class TenantSelectorComponent implements OnInit {
  tanents: any;
  activeTenant:String;
  // translate: TranslateService;

  constructor(
    private keycloakService: KeycloakService, 
    private layoutUtilsService: LayoutUtilsService, 
  ) {
  }


  ngOnInit(): void {
    this.activeTenant = localStorage.getItem('activeTenant');
  }

}
