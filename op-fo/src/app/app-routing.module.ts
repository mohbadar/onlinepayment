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
                path: "center",
                loadChildren: () =>
                  import("./views/pages/onlinepayment/center/center.module").then((m) => m.CenterModule),
            },

            
            {
                path: "agent",
                loadChildren: () =>
                  import("./views/pages/onlinepayment/agent/agent.module").then((m) => m.AgentModule),
            },

            {
                path: "fee-model",
                loadChildren: () =>
                  import("./views/pages/onlinepayment/fee-model/fee-model.module").then((m) => m.FeeModelModule),
            },
            {
                path: "bill-type",
                loadChildren: () =>
                  import("./views/pages/onlinepayment/bill-type/bill-type.module").then((m) => m.BillTypeModule),
            },
            {
                path: 'organization-admin',
                canActivate: [TranslateGuard],
                data: { moduleName: 'organization-admin' },
                loadChildren: () => import('./views/pages/onlinepayment/organization-admin/organization-admin.module').then(m => m.OrganizationAdminModule)
            },
        
            {
                path: 'third-party-integration',
                canActivate: [TranslateGuard],
                data: { moduleName: 'third-party-integration' },
                loadChildren: () => import('./views/pages/onlinepayment/third-party-integration/third-party-integration.module').then(m => m.ThirdPartyIntegrationModule)
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
