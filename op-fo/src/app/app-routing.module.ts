// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
import { TranslateGuard } from './translate.guard';
import { TranslateModule } from '@ngx-translate/core';
import { KeycloakAuthGuard } from 'keycloak-angular';


const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
        canActivate: [],
        children: [
            {
                path: '',
                canActivate: [TranslateGuard],
                data: { moduleName: 'dashboard' },
                loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
            },

            {
                path: "province",
                loadChildren: () =>
                  import("./views/pages/onlinepayment/province/province.module").then((m) => m.ProvinceModule),
            },

            {
                path: "organization",
                loadChildren: () =>
                  import("./views/pages/onlinepayment/organization/organization.module").then((m) => m.OrganizationModule),
            },
           
            {
                path: 'pda',
                canActivate: [TranslateGuard],
                data: { moduleName: 'pda' },
                loadChildren: () => import('./views/pages/pda/pda.module').then(m => m.PdaModule)
            },
            {
                path: 'builder',
                canActivate: [TranslateGuard, KeycloakAuthGuard],
                data: { moduleName: 'builder' },
                loadChildren: () => import('./views/theme/content/builder/builder.module').then(m => m.BuilderModule)
            },
            {
                path: 'error/403',
                component: ErrorPageComponent,
                data: {
                    'type': 'error-v6',
                    'code': 403,
                    'title': '403... Access forbidden',
                    'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
                }
            },
            { path: 'error/:type', component: ErrorPageComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule, TranslateModule]
})
export class AppRoutingModule {
}
