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


import { ProvinceComponent } from './province.component';
import { ListProvinceComponent } from './component/list-province/list-province.component';
import { CreateProvinceComponent } from './component/create-province/create-province.component';
import { ViewProvinceComponent } from './component/view-province/view-province.component';
import { UpdateProvinceComponent } from './component/update-province/update-province.component';
import { NotificationComponent } from 'app/views/partials/layout';
import { PartialsModule } from 'app/views/partials/partials.module';
import { ActionNotificationComponent } from 'app/views/partials/content/crud';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProvinceUserRelationComponent } from './component/province-user-relation/province-user-relation.component';
import { NgSelectModule } from '@ng-select/ng-select';


const routes: Routes = [
    {

        path: '',
        component: ProvinceComponent,
        children: [
            {
                path: '',
                component: ListProvinceComponent
            },
            {
                path: 'add',
                component: CreateProvinceComponent
            },
            {
                path: 'update',
                component: UpdateProvinceComponent
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
        ViewProvinceComponent
    ],
    declarations: [
        ListProvinceComponent,
        CreateProvinceComponent,
        ProvinceComponent,
        ViewProvinceComponent,
        UpdateProvinceComponent,
        ProvinceUserRelationComponent,
    ],
})
export class ProvinceModule {
}
