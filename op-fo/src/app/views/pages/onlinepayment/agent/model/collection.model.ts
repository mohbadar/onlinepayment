import { BaseEntity } from 'app/core/common-models/base-entity.model';

export class CollectionModel extends BaseEntity {
    billNo: string;
    tenderedAmount: number;
    agentId: string;
    paidAmount: number;
    paymentType: string;
    posted: boolean;
}