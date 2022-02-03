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

import {NgxPrintModule} from 'ngx-print';
import { ListAgentComponent} from './component/list-agent/list-agent.component';
import { CreateAgentComponent } from './component/create-agent/create-agent.component';
import { ViewAgentComponent } from './component/view-agent/view-agent.component';
import { UpdateAgentComponent } from './component/update-agent/update-agent.component';
import { NotificationComponent } from 'app/views/partials/layout';
import { PartialsModule } from 'app/views/partials/partials.module';
import { ActionNotificationComponent } from 'app/views/partials/content/crud';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgentUserRelationComponent} from './component/agent-user-relation/agent-user-relation.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgentComponent} from './agent.component';
import { CreditAgentAccountComponent } from './component/credit-agent-account/credit-agent-account.component';
import { DebitAgentAccountComponent } from './component/debit-agent-account/debit-agent-account.component';
import { AgentBillPaymentComponent } from './component/agent-bill-payment/agent-bill-payment.component';
import { AgentSlipPrintComponent } from './component/agent-slip-print/agent-slip-print.component';
import { AgentBalanceSheetComponent } from './component/agent-balance-sheet/agent-balance-sheet.component';
import { DuplicateSlipPrintComponent } from './component/duplicate-slip-print/duplicate-slip-print.component';
import { AgentRevenueReportComponent } from './component/agent-revenue-report/agent-revenue-report.component';


const routes: Routes = [
    {

        path: '',
        component: AgentComponent,
        children: [
            {
                path: '',
                component: ListAgentComponent
            },
            {
                path: 'add',
                component: CreateAgentComponent
            },
            {
                path: 'update',
                component: UpdateAgentComponent
            },
            {
                path: 'credit',
                component: CreditAgentAccountComponent
            },
            {
                path: 'debit',
                component: DebitAgentAccountComponent
            },
            {
                path: 'bill-payment',
                component: AgentBillPaymentComponent
            },
            {
                path: 'slip-print',
                component: DuplicateSlipPrintComponent
            },
            {
                path: 'agent-balance-sheet',
                component: AgentBalanceSheetComponent
            },
            {
                path: 'agent-revenue-report',
                component: AgentRevenueReportComponent
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
        NgSelectModule,
        NgxPrintModule
    ],

    entryComponents: [
        ActionNotificationComponent,
        NotificationComponent,
        ViewAgentComponent
    ],
    declarations: [
        ListAgentComponent,
        CreateAgentComponent,
        AgentComponent,
        ViewAgentComponent,
        UpdateAgentComponent,
        AgentUserRelationComponent,
        CreditAgentAccountComponent,
        DebitAgentAccountComponent,
        AgentBillPaymentComponent,
        AgentSlipPrintComponent,
        AgentBalanceSheetComponent,
        DuplicateSlipPrintComponent,
        AgentRevenueReportComponent
    ],
})
export class AgentModule {
}
