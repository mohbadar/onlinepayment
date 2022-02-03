import { BaseEntity } from 'app/core/common-models/base-entity.model';

export class AgentPayment extends BaseEntity {
    agentId:string;
    paymentAmount:string;
    channel:string;
}