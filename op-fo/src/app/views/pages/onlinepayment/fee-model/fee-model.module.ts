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
import { FeeModelComponent } from './fee-model.component';
import { CreateFeemodelComponent } from './component/create-feemodel/create-feemodel.component';
import { ViewFeemodelComponent } from './component/view-feemodel/view-feemodel.component';
import { UpdateFeemodelComponent } from './component/update-feemodel/update-feemodel.component';
import { ListFeemodelComponent } from './component/list-feemodel/list-feemodel.component';


const routes: Routes = [
    {

        path: '',
        component: FeeModelComponent,
        children: [
            // {
            //     path: '',
            //     component: ListAgentComponent
            // },
            // {
            //     path: 'add',
            //     component: CreateAgentComponent
            // },
            // {
            //     path: 'update',
            //     component: UpdateAgentComponent
            // },
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
    ],
    declarations: [
        FeeModelComponent,
        CreateFeemodelComponent,
        ViewFeemodelComponent,
        UpdateFeemodelComponent,
        ListFeemodelComponent
    ],
})
export class AgentModule {
}
