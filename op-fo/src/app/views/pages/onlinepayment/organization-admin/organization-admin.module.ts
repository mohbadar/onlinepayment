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


import { NotificationComponent } from 'app/views/partials/layout';
import { PartialsModule } from 'app/views/partials/partials.module';
import { ActionNotificationComponent } from 'app/views/partials/content/crud';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrganizationAdminComponent } from './organization-admin.component';
import { GenerateDateBasedStatementComponent } from './component/generate-date-based-statement/generate-date-based-statement.component';
import { RevenueReportComponent } from './component/revenue-report/revenue-report.component';
import { NgbCalendar, NgbCalendarPersian, NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerI18nPersian } from 'app/core/service/datepicker-jalali.service';


const routes: Routes = [
    {

        path: '',
        component: OrganizationAdminComponent,
        children: [
            {
                path: 'generate-date-based-statement',
                component: GenerateDateBasedStatementComponent
            },
            {
                path: 'revenue-report',
                component: RevenueReportComponent
            },
            // {
            //     path: 'update',
            //     component: UpdateOrganizationComponent
            // },
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
    ],
    declarations: [
        OrganizationAdminComponent,
        GenerateDateBasedStatementComponent,
        RevenueReportComponent
    ],
})
export class OrganizationAdminModule {
}
