// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DashboardComponent } from './dashboard.component';
import { NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
// Translate
import { TranslateModule } from '@ngx-translate/core';
import { DevTeamComponent } from './dev-team/dev-team.component';

@NgModule({
    imports: [
        CommonModule,
        PartialsModule,
        CoreModule,
        TranslateModule.forChild(),
        RouterModule.forChild([
            {
                path: '',
                component: DashboardComponent
            },

            {
                path: 'dev-team',
                component: DevTeamComponent
            },
        ]),

        // ng-bootstrap modules
        NgbDropdownModule,
        NgbTabsetModule,
        NgbTooltipModule,
    ],
    providers: [],
    declarations: [
        DashboardComponent,
        DevTeamComponent,
    ]
})
export class DashboardModule {
}
