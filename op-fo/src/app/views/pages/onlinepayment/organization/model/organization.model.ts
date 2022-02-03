import { BaseEntity } from 'app/core/common-models/base-entity.model';

export class Organization extends BaseEntity {
    id: any;
    name: string;
    code: string;
    phone:string;
    email:string;
    address:string;
    provinceId:string;
    bankName:string;
    bankAccountNo:string;
    bankCardHolderName:string;
    bankCardNo:string;
}