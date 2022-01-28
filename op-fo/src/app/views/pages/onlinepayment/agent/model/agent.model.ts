import { BaseEntity } from 'app/core/common-models/base-entity.model';

export class Agent extends BaseEntity {

    firstname:string;
    lastname:string;
    fathername:string;
    email:string;
    phone:string;
    address:string;
    grantFathername:string;
    tazkiraNo:string;
    frientAccountNo1:string;
    friendAccountNo2:string;
    provinceId:string;
    organizationId:string;
    centerId:string;
    accountNo:string;
}