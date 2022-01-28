import { BaseModel } from "app/core/_base/crud";

export class BillType extends BaseModel {
    name:string;
    tariffId:string;
    organizationId:string;
    centerId:string;
    feeModelId:string;
    provinceId:string;
    pricePerItem:number;
}