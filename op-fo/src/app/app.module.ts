// Angular
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
} from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  GestureConfig,
  MatProgressSpinnerModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from "@angular/material";
import { OverlayModule } from "@angular/cdk/overlay";
// Angular in memory
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
//Print Html
import { NgPrintModule } from "ng-print";
// Perfect Scroll bar
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from "ngx-perfect-scrollbar";
// SVG inline
import { InlineSVGModule } from "ng-inline-svg";
// Env
import { environment } from "../environments/environment";
// Hammer JS
import "hammerjs";
// NGX Permissions
import { NgxPermissionsModule } from "ngx-permissions";
// NGRX
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule, RouterState } from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
// State
import { metaReducers, reducers } from "./core/reducers";
// Copmponents
import { AppComponent } from "./app.component";
// Modules
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { ThemeModule } from "./views/theme/theme.module";
// Partials
import { PartialsModule } from "./views/partials/partials.module";

//Keycloak
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { KeycloakService, KeycloakAngularModule } from "keycloak-angular";

import { HttpErrorInterceptor } from "./core/interceptor/http-error.interceptor";

// Layout Services
import {
  DataTableService,
  KtDialogService,
  LayoutConfigService,
  LayoutRefService,
  MenuAsideService,
  MenuConfigService,
  MenuHorizontalService,
  PageConfigService,
  SplashScreenService,
  SubheaderService,
} from "./core/_base/layout";
// CRUD
import {
  HttpUtilsService,
  LayoutUtilsService,
  TypesUtilsService,
} from "./core/_base/crud";
// Config
import { LayoutConfig } from "./core/_config/layout.config";
// Highlight JS
import { HighlightModule, HIGHLIGHT_OPTIONS } from "ngx-highlightjs";
import { Router, RouterModule } from "@angular/router";
import { Principal } from "./core/common-models/principal.model";
import { Globals } from "./core/_base/layout/services/globals";
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbTimeAdapter,
} from "@ng-bootstrap/ng-bootstrap";
import { CustomDateParserFormatter } from "./core/service/custom-dateparserformatter.service";
import { CustomAdapter } from "./core/service/custom-datepicker-adapter.service";
import { NgbTimeStringAdapter } from "./core/service/custom-timeformatter.service";
import { FileDownloadService } from "./core/service/file-download.service";
import { NgbDatepickerI18nPersian } from "./core/service/datepicker-jalali.service";
import { DebounceClickDirective } from "./core/pipes/debounce-click.directive";

// tslint:disable-next-line:class-name
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelSpeed: 0.5,
  swipeEasing: true,
  minScrollbarLength: 40,
  maxScrollbarLength: 300,
};

export function initializeLayoutConfig(appConfig: LayoutConfigService) {
  // initialize app by loading default demo layout config
  return () => {
    if (appConfig.getConfig() === null) {
      appConfig.loadConfigs(new LayoutConfig().configs);
    }
  };
}

export function getHighlightLanguages() {
  return {
    typescript: () => import("highlight.js/lib/languages/typescript"),
    scss: () => import("highlight.js/lib/languages/scss"),
    xml: () => import("highlight.js/lib/languages/xml"),
    json: () => import("highlight.js/lib/languages/json"),
  };
}

export function kcInitializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init(environment.keycloakOptions);
        resolve();
        // console.log('Keycloak is initialized', keycloak.getUserRoles());
        this.principal = new Principal(
          keycloak.isLoggedIn(),
          keycloak.getUserRoles(),
          []
        );
        this.globals = this.principal;
      } catch (error) {
        console.log("Error thrown in init " + error);
        reject(error);
      }
    });
  };
}

@NgModule({
  declarations: [AppComponent, DebounceClickDirective],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighlightModule,
    // environment.isMockEnabled ? HttpClientInMemoryWebApiModule.forRoot(FakeApiService, {
    // 	passThruUnknownUrl: true,
    // 	dataEncapsulation: false
    // }) : [],
    NgxPermissionsModule.forRoot(),
    PartialsModule,
    CoreModule,
    OverlayModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: "router",
      routerState: RouterState.Minimal,
    }),
    StoreDevtoolsModule.instrument(),
    // AuthModule.forRoot(),
    TranslateModule.forRoot(),
    MatProgressSpinnerModule,
    InlineSVGModule.forRoot(),
    ThemeModule,
    KeycloakAngularModule,
    RouterModule,
    NgPrintModule,
  ],
  exports: [],

  providers: [
    DatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: kcInitializer,
      multi: true,
      deps: [KeycloakService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    // AuthService,
    LayoutConfigService,
    LayoutRefService,
    MenuConfigService,
    PageConfigService,
    KtDialogService,
    DataTableService,
    SplashScreenService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: GestureConfig,
    },
    {
      // layout config initializer
      provide: APP_INITIALIZER,
      useFactory: initializeLayoutConfig,
      deps: [LayoutConfigService],
      multi: true,
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: getHighlightLanguages(),
      },
    },
    // template services
    SubheaderService,
    MenuHorizontalService,
    MenuAsideService,
    HttpUtilsService,
    TypesUtilsService,
    LayoutUtilsService,
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        panelClass: "kt-mat-dialog-container__wrapper",
        height: "auto",
        width: "900px",
      },
    },
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    { provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
