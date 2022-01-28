import { BaseModel } from "app/core/_base/crud";

export class IssueBill extends BaseModel{
    centerId:string;
    billTypeId:string;
    numberOfItems:number;
    organizationUniqueBillIdentifier:string;
}