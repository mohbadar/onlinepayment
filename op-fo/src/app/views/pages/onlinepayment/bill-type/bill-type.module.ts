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
import { BillTypeComponent } from './bill-type.component';
import { CreateBilltypeComponent } from './component/create-billtype/create-billtype.component';
import { UpdateBilltypeComponent } from './component/update-billtype/update-billtype.component';
import { ListBilltypeComponent } from './component/list-billtype/list-billtype.component';
import { ViewBilltypeComponent } from './component/view-billtype/view-billtype.component';


const routes: Routes = [
    {

        path: '',
        component: BillTypeComponent,
        children: [
            {
                path: '',
                component: ListBilltypeComponent
            },
            {
                path: 'add',
                component: CreateBilltypeComponent
            },
            {
                path: 'update',
                component: UpdateBilltypeComponent
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
        ViewBilltypeComponent
    ],
    declarations: [
        BillTypeComponent,
        CreateBilltypeComponent,
        UpdateBilltypeComponent,
        ListBilltypeComponent,
        ViewBilltypeComponent
    ],
})
export class BillTypeModule {
}
