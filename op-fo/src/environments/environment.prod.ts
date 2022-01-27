// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { KeycloakConfig, KeycloakInitOptions, KeycloakOptions } from 'keycloak-angular';

// Add here your keycloak configuration information
const keycloakConfig: KeycloakConfig = {
    url: 'http://149.54.11.58:8080/auth',
    realm: 'nid_service_kit',
    clientId: 'pda'
};

const keycloakInitOptions: KeycloakInitOptions = {
    onLoad: 'login-required',
    checkLoginIframe: false
};

const keycloakOptions: KeycloakOptions = {
    config: keycloakConfig,
    initOptions: keycloakInitOptions,
    enableBearerInterceptor: true
};

export const environment = {
    production: true,
    keycloakOptions,
    log: false,
    flags: {
      useNewHeader: false
   }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
