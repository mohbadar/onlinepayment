// Angular
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
// Core Module
import { CoreModule } from "../../../core/core.module";
import { PartialsModule } from "../../partials/partials.module";
import {
  NgbDropdownModule,
  NgbTabsetModule,
  NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
// Translate
import { TranslateModule } from "@ngx-translate/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTabGroup,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
} from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { PagesModule } from "../pages.module";
import { PdaComponent } from "./pda.component";
import { RegisterDocumentComponent } from "./components/register-document/register-document.component";
import { VerifyDocumentComponent } from "./components/verify-document/verify-document.component";
import { SearchDocumentComponent } from "./components/search-document/search-document.component";
import { SearchResponseDocumentComponent } from "./components/search-response-document/search-response-document.component";

@NgModule({
  imports: [
    CommonModule,
    PartialsModule,
    CoreModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: PdaComponent,
        children: [
          // {
          //     path: '',
          //     component: RegisterDocumentComponent
          // },
          {
            path: "find-nid-process-docs",
            component: SearchDocumentComponent,
          },
          {
            path: "store-nid-process-docs",
            component: RegisterDocumentComponent,
          },

          {
            path: "verify-nid-process-docs",
            component: VerifyDocumentComponent,
          },
        ],
      },
    ]),

    NgbDropdownModule,
    NgbTabsetModule,
    NgbTooltipModule,
    NgxSpinnerModule,
    NgSelectModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatIconModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatCardModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    PagesModule,
    // KeycloakAngularModule
  ],
  providers: [],
  declarations: [
    PdaComponent,
    RegisterDocumentComponent,
    SearchDocumentComponent,
    VerifyDocumentComponent,
    SearchResponseDocumentComponent,
  ],
})
export class PdaModule {}
