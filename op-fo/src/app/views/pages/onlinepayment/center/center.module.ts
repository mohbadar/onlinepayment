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


import { ListCenterComponent} from './component/list-organization/list-center.component';
import { CreateCenterComponent } from './component/create-center/create-center.component';
import { ViewCenterComponent } from './component/view-center/view-center.component';
import { UpdateCenterComponent } from './component/update-center/update-center.component';
import { NotificationComponent } from 'app/views/partials/layout';
import { PartialsModule } from 'app/views/partials/partials.module';
import { ActionNotificationComponent } from 'app/views/partials/content/crud';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CenterUserRelationComponent} from './component/center-user-relation/center-user-relation.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CenterComponent} from './center.component';
import { IssueBillComponent } from './component/centeruser/issue-bill/issue-bill.component';
import { ConfirmBillPaymentComponent } from './component/centeruser/confirm-bill-payment/confirm-bill-payment.component';
import { GenerateStatementComponent } from './component/centeruser/generate-statement/generate-statement.component';
import { BillDetailRepesentationComponent } from './component/centeruser/bill-detail-repesentation/bill-detail-repesentation.component';
import { CenterManagerMonitoringComponent } from './component/centermanager/center-manager-monitoring/center-manager-monitoring.component';
import { CenterManagerStatementComponent } from './component/centermanager/center-manager-statement/center-manager-statement.component';
import { NgbCalendar, NgbCalendarPersian, NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerI18nPersian } from 'app/core/service/datepicker-jalali.service';


const routes: Routes = [
    {

        path: '',
        component: CenterComponent,
        children: [
            {
                path: '',
                component: ListCenterComponent
            },
            {
                path: 'add',
                component: CreateCenterComponent
            },
            {
                path: 'update',
                component: UpdateCenterComponent
            },
            {
                path: 'issue-bill',
                component: IssueBillComponent
            },
            {
                path: 'confirm-bill-payment',
                component: ConfirmBillPaymentComponent
            },
            {
                path: 'user-statement',
                component: GenerateStatementComponent
            },
            {
                path: 'center-manager-statement',
                component: CenterManagerStatementComponent
            },
            {
                path: 'center-manager-monitoring',
                component: CenterManagerMonitoringComponent
            },
        ]

    }
];

@NgModule({
    providers: [
        { provide: NgbCalendar, useClass: NgbCalendarPersian },
        { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian }
    ],
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
        NgSelectModule,
        NgbModule
    ],

    entryComponents: [
        ActionNotificationComponent,
        NotificationComponent,
        ViewCenterComponent
    ],
    declarations: [
        ListCenterComponent,
        CreateCenterComponent,
        CenterComponent,
        ViewCenterComponent,
        UpdateCenterComponent,
        CenterUserRelationComponent,
        IssueBillComponent,
        ConfirmBillPaymentComponent,
        GenerateStatementComponent,
        BillDetailRepesentationComponent,
        CenterManagerMonitoringComponent,
        CenterManagerStatementComponent
    ],
})
export class CenterModule {
}
