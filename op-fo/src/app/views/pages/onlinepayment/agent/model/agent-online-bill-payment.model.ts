import { BaseEntity } from 'app/core/common-models/base-entity.model';

export class OnlineBillPayment extends BaseEntity {
    organizationId:string;
    billTypeId:string;
    billIdentifier:string;
}