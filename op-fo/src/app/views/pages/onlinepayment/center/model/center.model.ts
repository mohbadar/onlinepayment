import { BaseEntity } from 'app/core/common-models/base-entity.model';

export class Center extends BaseEntity {
    id: any;
    name: string;
    code: string;
    phone:string;
    email:string;
    address:string;
    provinceId:string;
    parentCenter:string;
    organizationId:string;
}