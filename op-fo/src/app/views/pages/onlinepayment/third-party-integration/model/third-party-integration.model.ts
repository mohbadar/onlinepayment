import { BaseModel } from "app/core/_base/crud";

export class ThirdPartyIntegration extends BaseModel {
    name:string;
    code:string;
    organizationId:string;
    provinceId:string;
    host:string;
    port:number;
    uri:string;
    username:string;
    password:string;
    authorizationType:string;
    credentialPosition:string;
    dataExchangeProtocol:string;
    apiKey:string;
    apiValue:string;
    oAuth2GrantType:string;
    clientId:string;
    clientSecret:string;
}