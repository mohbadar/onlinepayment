import { VoltageGroup } from '../../views/pages/configuration/billing/voltage-group/model/voltage-group-master.model';
import { VoltageUnit } from './VoltageUnit.model';
import { BaseEntity } from './base-entity.model';

export class VoltageGroupMaster extends BaseEntity {

    private voltageUnit: VoltageUnit;
    private voltageValue: String;
    private voltageGroup: VoltageGroup;
    private phase: String;
    private voltageDescription: String;
}