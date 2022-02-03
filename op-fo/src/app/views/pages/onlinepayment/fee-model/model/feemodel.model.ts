import { BaseModel } from "app/core/_base/crud";

export class FeeModel extends BaseModel {
    name:string;
    isItemBased:boolean;
    type:string;
    percentage:number;
    amount:number;
    agentFeeAmount: number;
    agentFeePercentage: number;
}