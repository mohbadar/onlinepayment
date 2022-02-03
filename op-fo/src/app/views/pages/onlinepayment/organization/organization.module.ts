// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Translate
import { TranslateModule } from '@ngx-translate/core';



// Material
import {
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTabsModule,
    MatNativeDateModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatTooltipModule,
} from '@angular/material';


import { ListOrganizationComponent } from './component/list-organization/list-organization.component';
import { CreateOrganizationComponent } from './component/create-organization/create-organization.component';
import { ViewOrganizationComponent } from './component/view-organization/view-organization.component';
import { UpdateOrganizationComponent } from './component/update-organization/update-organization.component';
import { NotificationComponent } from 'app/views/partials/layout';
import { PartialsModule } from 'app/views/partials/partials.module';
import { ActionNotificationComponent } from 'app/views/partials/content/crud';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OrganizationUserRelationComponent } from './component/organization-user-relation/organization-user-relation.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrganizationComponent } from './organization.component';
import { CreditOrganizationLedgerComponent } from './component/credit-organization-ledger/credit-organization-ledger.component';
import { DebitOrganizationLedgerComponent } from './component/debit-organization-ledger/debit-organization-ledger.component';
import { OrganizationBalanceSheetComponent } from './component/organization-balance-sheet/organization-balance-sheet.component';


const routes: Routes = [
    {

        path: '',
        component: OrganizationComponent,
        children: [
            {
                path: '',
                component: ListOrganizationComponent
            },
            {
                path: 'add',
                component: CreateOrganizationComponent
            },
            {
                path: 'update',
                component: UpdateOrganizationComponent
            },
            {
                path: 'credit',
                component: CreditOrganizationLedgerComponent
            },
            {
                path: 'debit',
                component: DebitOrganizationLedgerComponent
            },
            {
                path: 'balance-sheet',
                component: OrganizationBalanceSheetComponent
            },
        ]

    }
];

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        PartialsModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        MatButtonModule,
        MatMenuModule,
        MatSelectModule,
        MatInputModule,
        MatTableModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatIconModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatCardModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatTabsModule,
        MatTooltipModule,
        MatDialogModule,
        NgxSpinnerModule,
        NgSelectModule
    ],

    entryComponents: [
        ActionNotificationComponent,
        NotificationComponent,
        ViewOrganizationComponent
    ],
    declarations: [
        ListOrganizationComponent,
        CreateOrganizationComponent,
        OrganizationComponent,
        ViewOrganizationComponent,
        UpdateOrganizationComponent,
        OrganizationUserRelationComponent,
        CreditOrganizationLedgerComponent,
        DebitOrganizationLedgerComponent,
        OrganizationBalanceSheetComponent
    ],
})
export class OrganizationModule {
}
