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
    MatButtonModule,
    MatDialogModule,
    MatIconModule
} from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConsumerSearchResultComponent } from 'app/views/pages/service-connection/consumer-search-result/consumer-search-result.component';
//import { ConsumerSearchResultModule } from 'app/views/pages/service-connection/consumer-search-result/consumer-search-result.module';
import { SearchResultComponent } from './search-result.component';
import { NotificationComponent } from '../topbar/notification/notification.component';
import { PartialsModule } from '../../partials.module';
import { ActionNotificationComponent } from '../../content/crud';

const routes: Routes = [
    {

        path: '',
        component: SearchResultComponent,
        children: []

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
        TranslateModule.forChild(),
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        NgSelectModule,
        NgxSpinnerModule,
        //ConsumerSearchResultModule
    ],
    entryComponents: [
        ActionNotificationComponent,
        NotificationComponent
    ],
    declarations: [
        SearchResultComponent,
    ],
})
export class CustomerSearchModule { }
