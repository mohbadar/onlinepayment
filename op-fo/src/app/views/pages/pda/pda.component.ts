import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutUtilsService } from 'app/core/_base/crud';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'kt-pda',
  templateUrl: './pda.component.html',
  styleUrls: ['./pda.component.scss']
})
export class PdaComponent implements OnInit {

  constructor(){}
     

  ngOnInit(): void {
  }

}
