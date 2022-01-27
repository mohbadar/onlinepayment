// environment.defaults.ts


// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import {
  KeycloakConfig,
  KeycloakInitOptions,
  KeycloakOptions,
} from "keycloak-angular";

// Add here your keycloak configuration information
const keycloakConfig: KeycloakConfig = {
  url: "http://localhost:8080/auth",
  realm: "nid_service_kit",
  clientId: "pda",
};

const keycloakInitOptions: KeycloakInitOptions = {
  onLoad: "login-required",
  checkLoginIframe: false,
};

const keycloakOptions: KeycloakOptions = {
  config: keycloakConfig,
  initOptions: keycloakInitOptions,
  enableBearerInterceptor: true,
  bearerExcludedUrls: ["/assets", "/clients/public"],
};

export const environment = {
   production: false,
   keycloakOptions,
   log: true,
   flags: {
      useNewHeader: true
   }
}