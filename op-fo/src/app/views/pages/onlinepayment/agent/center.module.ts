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


import { ListCenterComponent} from './component/list-center/list-center.component';
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
        ViewCenterComponent
    ],
    declarations: [
        ListCenterComponent,
        CreateCenterComponent,
        CenterComponent,
        ViewCenterComponent,
        UpdateCenterComponent,
        CenterUserRelationComponent
    ],
})
export class CenterModule {
}
