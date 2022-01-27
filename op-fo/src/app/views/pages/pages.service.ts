import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as moment from 'jalali-moment';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

const _BASE_URL = "/api/generic";
@Injectable({
    providedIn: 'root'
})
export class PagesService {

    private provinces = null;
    zones = null;
    groups = null;
    private junctions = null;
    junctionStations = null;
    areas = null;
    cycles = null;
    years = new Set();
    roles = null;
    employees = null;
    banks = null;
    bankBranches = [];
    branchCounters = [];
    counters;
    routeCodes = null;
    meterReaderMasters = null;
    meterBoxMasters = null;
    distributionTransformerMasters = null;
    tariffs = null;
    status = null;
    anomalies = null;
    readerCodes = null;
    weeks = null;
    governmentCodes = null;
    substationMasters = null;
    stationTypes = null;
    feederMasters = null;
    voltageLevels = null;
    voltageGroupMasters = null;
    metricMasters = null;
    zoneCycles = null;
    meterMakeDetails = null;
    meterCapacityMasters = null;

    constructor(
        private httpClient: HttpClient,
        private datePipe: DatePipe,
    ) { }


    getUsers(): Observable<any> {
        console.log("this.httpClient.get(`${_BASE_URL}/users`)------------", this.httpClient.get(`${_BASE_URL}/users`));
        return this.httpClient.get(`${_BASE_URL}/users`);
    }

    public getProvinces(force: boolean = false): Observable<any> {
        if (this.provinces != null && force != true) {
            return of(this.provinces);
        }
        return this.httpClient.get(`${_BASE_URL}/provinces`).pipe(
            map(provinces => {
                this.provinces = provinces;

                return this.provinces;
            })
        );
    }

    public getZones(force: boolean = false, provinceId?): Observable<any> {
        if (this.zones != null && force != true) {
            return of(this.zones);
        }
        const PATH = provinceId != undefined ? `${_BASE_URL}/zones/${provinceId}` : `${_BASE_URL}/zones`;
        return this.httpClient.get(PATH).pipe(
            map(zones => {
                this.zones = zones;
                return this.zones;
            })
        );
    }

    public getGroups(force: boolean = false): Observable<any> {
        if (this.groups != null && force != true) {
            return of(this.groups);

        }
        return this.httpClient.get(`${_BASE_URL}/groups`).pipe(
            map(groups => {
                this.groups = groups;
                return groups;
            })
        );
    }

    public getJunctions(force: boolean = false, provinceId?): Observable<any> {

        if (this.junctions != null && force != true) {
            return of(this.junctions);
        }
        const PATH = provinceId != undefined ? `${_BASE_URL}/office-master/${provinceId}` : `${_BASE_URL}/office-master`;
        return this.httpClient.get(PATH).pipe(
            map(junctions => {
                this.junctions = junctions;
                return this.junctions;
            })
        );
    }

    public getJunctionStations(force: boolean = false): Observable<any> {
        if (this.junctionStations != null && force != true) {
            return of(this.junctionStations);
        }
        return this.httpClient.get(`${_BASE_URL}/junction_stations`).pipe(
            map(junctionStations => {
                this.junctionStations = junctionStations;
                return junctionStations;
            })
        );
    }

    // public getAreas(force: boolean = false): Observable<any> { ???
    //     if (this.areas != null && force != true) {
    //         return of(this.areas);
    //     }
    //     return this.httpClient.get(`${_BASE_URL}/areas`).pipe(
    //         map(areas => {
    //             this.areas = areas;
    //             return areas;
    //         })
    //     );
    // }

    public getAreas(force: boolean = false, junctionId?): Observable<any> {

        if (this.areas != null && force != true) {
            return of(this.areas);
        }
        const PATH = junctionId != undefined ? `${_BASE_URL}/areas/${junctionId}` : `${_BASE_URL}/areas`;
        return this.httpClient.get(PATH).pipe(
            map(areas => {
                this.areas = areas;
                return this.areas;
            })
        );
    }

    public getCycles(force: boolean = false): Observable<any> {
        if (this.cycles != null && force != true) {
            return of(this.cycles);
        }
        return this.httpClient.get(`${_BASE_URL}/cycles`).pipe(
            map(cycles => {
                this.cycles = cycles;
                return cycles;
            })
        );
    }

    public getYears() {

        const currentYear = moment().locale('fa').format('YYYY');

        let set = new Set();
        const maxYear = Number(currentYear) + 1;
        const minYear = Number(currentYear) - 1;
        for (let year = minYear; year <= maxYear; year++) {
            this.years.add(year)
        }
        // if (this.years.length < 1) {
        //     this.years.push(currentYear);
        // }

        return Array.from(this.years);
    }

    public getRoles(force: boolean = false): Observable<any> {
        if (this.roles != null && force != true) {
            return of(this.roles);
        }
        return this.httpClient.get(`${_BASE_URL}/roles`).pipe(
            map(roles => {
                this.roles = roles;
                return roles;
            })
        );
    }

    public getEmployees(force: boolean = false): Observable<any> {
        if (this.employees != null && force != true) {
            return of(this.employees);
        }
        return this.httpClient.get(`${_BASE_URL}/employees`).pipe(
            map(employees => {
                this.employees = employees;
                return employees;
            })
        );
    }

    public getBanks(force: boolean = false): Observable<any> {
        if (this.banks != null && force != true) {
            return of(this.banks);
        }
        return this.httpClient.get(`${_BASE_URL}/banks`).pipe(
            map(banks => {
                this.banks = banks;
                return banks;
            })
        );
    }


    
    public getUserBank(force: boolean = false): Observable<any> {
        if (this.banks != null && force != true) {
            return of(this.banks);
        }
        return this.httpClient.get(`${_BASE_URL}/banks/user`).pipe(
            map(banks => {
                this.banks = banks;
                return banks;
            })
        );
    }

    public getBankBranches(bankId, force: boolean = false): Observable<any> {
        if (this.bankBranches.length && this.bankBranches[bankId] != null && force != true) {
            return of(this.bankBranches[bankId]);
        }
        return this.httpClient.get(`${_BASE_URL}/branches/${bankId}`).pipe(
            map(bankBranches => {
                this.bankBranches[bankId] = bankBranches;
                return bankBranches;
            })
        );
    }

    public getBranchCounters(branchId, force: boolean = false): Observable<any> {
        console.log("branch", branchId);
        if (this.bankBranches.length && this.branchCounters[branchId] != null && force != true) {
            return of(this.branchCounters[branchId]);
        }
        return this.httpClient.get(`${_BASE_URL}/counters/${branchId}`).pipe(
            map(branchCounters => {
                this.branchCounters[branchId] = branchCounters;
                return branchCounters;
            })
        );
    }

    public getCounters(force: boolean = false): Observable<any> {
        return this.httpClient.get(`${_BASE_URL}/counters`).pipe(
            map(counters => {
                this.counters = counters;
                return counters;
            })
        );
    }


    public getUserCountersByBankAndBranch(userId: string, force: boolean = false): Observable<any> {
        return this.httpClient.get(`${_BASE_URL}/counters-by-user-bank-and-branch`, {
            params: {
                'userId': userId
            }
        }).pipe(
            map(counters => {
                this.counters = counters;
                return counters;
            })
        );
    }
    public getRouteCodes(force: boolean = false): Observable<any> {
        if (this.routeCodes != null && force != true) {
            return of(this.routeCodes);
        }
        return this.httpClient.get(`${_BASE_URL}/route-codes`).pipe(
            map(routeCodes => {
                this.routeCodes = routeCodes;
                return routeCodes;
            })
        );
    }
    public getMeterBoxMasters(force: boolean = false, dtrId?): Observable<any> {
        if (this.meterBoxMasters != null && force != true) {
            return of(this.meterBoxMasters);
        }
        const PATH = dtrId != undefined ? `${_BASE_URL}/meter-box-master/${dtrId}` : `${_BASE_URL}/meter-box-masters`;
        return this.httpClient.get(PATH).pipe(
            map(meterBoxMasters => {
                this.meterBoxMasters = meterBoxMasters;
                console.log("METER_BOX", meterBoxMasters)
                return meterBoxMasters;
            })
        );
    }


    public getMeterBoxMastersByProvinceId(force: boolean = false, provinceId?): Observable<any> {
        if (this.meterBoxMasters != null && force != true) {
            return of(this.meterBoxMasters);
        }
        const PATH = provinceId != undefined ? `${_BASE_URL}/meter-box-masters/province/${provinceId}` : `${_BASE_URL}/meter-box-masters`;
        return this.httpClient.get(PATH).pipe(
            map(meterBoxMasters => {
                // this.meterBoxMasters = meterBoxMasters;
                console.log("METER_BOX", meterBoxMasters)
                return meterBoxMasters;
            })
        );
    }


    public getMeterBoxMastersByTransformerId(transformerId?): Observable<any> {
        // if (this.meterBoxMasters != null && force != true) {
        //     return of(this.meterBoxMasters);
        // }
        const PATH =`${_BASE_URL}/meter-box-masters/transformer/${transformerId}`;
        return this.httpClient.get(PATH);
    }


    
    public getMeterBoxMastersByJunctionId(force: boolean = false, junctionId): Observable<any> {
        if (this.meterBoxMasters != null && force != true) {
            return of(this.meterBoxMasters);
        }
        const PATH = `${_BASE_URL}/meter-box-masters/junction/${junctionId}`;
        return this.httpClient.get(PATH).pipe(
            map(meterBoxMasters => {
                // this.meterBoxMasters = meterBoxMasters;
                console.log("METER_BOX", meterBoxMasters)
                return meterBoxMasters;
            })
        );
    }
    

    public getMeterReaderMasters(force: boolean = false, officeId?): Observable<any> {
        if (this.meterReaderMasters != null && force != true) {
            return of(this.meterReaderMasters);
        }
        const PATH = officeId != undefined ? `${_BASE_URL}/meter-reader-masters/${officeId}` : `${_BASE_URL}/meter-reader-masters`;
        return this.httpClient.get(PATH).pipe(
            map(meterReaderMasters => {
                this.meterReaderMasters = meterReaderMasters;
                // console.log(this.meterReaderMasters);
                return meterReaderMasters;
            })
        );
    }


    public getDistributionTransformerMasters(force: boolean = false, meterReaderId?): Observable<any> {
        if (this.distributionTransformerMasters != null && force != true) {
            return of(this.distributionTransformerMasters);
        }
        const PATH = meterReaderId != undefined ? `${_BASE_URL}/distribution-transformer-masters/${meterReaderId}` : `${_BASE_URL}/distribution-transformer-masters`;
        return this.httpClient.get(PATH).pipe(
            map(distributionTransformerMasters => {
                this.distributionTransformerMasters = distributionTransformerMasters;
                return distributionTransformerMasters;
            })
        );
    }
    public getTariffs(force: boolean = false): Observable<any> {
        if (this.tariffs != null && force != true) {
            return of(this.tariffs);
        }
        return this.httpClient.get(`${_BASE_URL}/tariffs`).pipe(
            map(tariffs => {
                this.tariffs = tariffs;
                return tariffs;
            })
        );
    }

    public getTariffsByProvince(force: boolean = false, provinceId: string): Observable<any> {
        if (this.tariffs != null && force != true) {
            return of(this.tariffs);
        }
        return this.httpClient.get(`${_BASE_URL}/tariffs/province/${provinceId}`).pipe(
            map(tariffs => {
                this.tariffs = tariffs;
                return tariffs;
            })
        );
    }


    public getStatus(force: boolean = false): Observable<any> {
        if (this.status != null && force != true) {
            return of(this.status);
        }
        return this.httpClient.get(`${_BASE_URL}/status`).pipe(
            map(status => {
                this.status = status;
                return status;
            })
        );
    }
    public getAnomalies(force: boolean = false): Observable<any> {
        if (this.anomalies != null && force != true) {
            return of(this.anomalies);
        }
        return this.httpClient.get(`${_BASE_URL}/anomalies`).pipe(
            map(anomalies => {
                this.anomalies = anomalies;
                return anomalies;
            })
        );
    }
    public getReaderCodes(force: boolean = false): Observable<any> {
        if (this.readerCodes != null && force != true) {
            return of(this.readerCodes);
        }
        return this.httpClient.get(`${_BASE_URL}/reader-codes`).pipe(
            map(readerCodes => {
                this.readerCodes = readerCodes;
                return readerCodes;
            })
        );
    }

    public getWeeks(force: boolean = false): Observable<any> {
        if (this.weeks != null && force != true) {
            return of(this.weeks);
        }
        return this.httpClient.get(`${_BASE_URL}/weeks`).pipe(
            map(weeks => {
                this.weeks = weeks;
                return weeks;
            })
        );
    }
    public getGovernmentCodes(force: boolean = false): Observable<any> {
        if (this.governmentCodes != null && force != true) {
            return of(this.governmentCodes);
        }
        return this.httpClient.get(`${_BASE_URL}/government-codes`).pipe(
            map(governmentCodes => {
                this.governmentCodes = governmentCodes;
                return governmentCodes;
            })
        );
    }

    public getSubstationMasters(force: boolean = false, substnTypeId?): Observable<any> {

        if (this.substationMasters != null && force != true) {
            return of(this.substationMasters);
        }
        const PATH = substnTypeId != undefined ? `${_BASE_URL}/substation-master/${substnTypeId}` : `${_BASE_URL}/substation-master`;
        return this.httpClient.get(PATH).pipe(
            map(substationMasters => {
                this.substationMasters = substationMasters;
                return this.substationMasters;
            })
        );

    }

    public getStationTypes(force: boolean = false): Observable<any> {
        if (this.stationTypes != null && force != true) {
            return of(this.stationTypes);
        }
        return this.httpClient.get(`${_BASE_URL}/station-type`).pipe(
            map(stationTypes => {
                this.stationTypes = stationTypes;
                return stationTypes;
            })
        );
    }
    // public getFeederMasters(force: boolean = false): Observable<any> {  
    //     if (this.feederMasters != null && force != true) {
    //         return of(this.feederMasters);
    //     }
    //     return this.httpClient.get(`${_BASE_URL}/feeder-Masters`).pipe(
    //         map(feederMasters => {
    //             this.feederMasters = feederMasters;
    //             return feederMasters;
    //         })
    //     );
    // }

    public getFeederMasters(force: boolean = false, substId?): Observable<any> {

        if (this.feederMasters != null && force != true) {
            return of(this.feederMasters);
        }
        const PATH = substId != undefined ? `${_BASE_URL}/feeder-Masters/${substId}` : `${_BASE_URL}/feeder-Masters`;
        return this.httpClient.get(PATH).pipe(
            map(feederMasters => {
                this.feederMasters = feederMasters;
                return this.feederMasters;
            })
        );
    }

    public getVoltageLevels(force: boolean = false): Observable<any> {
        if (this.voltageLevels != null && force != true) {
            return of(this.voltageLevels);
        }
        return this.httpClient.get(`${_BASE_URL}/voltage-levels`).pipe(
            map(voltageLevels => {
                this.voltageLevels = voltageLevels;
                return voltageLevels;
            })
        );
    }
    public getVoltageGroupMasters(force: boolean = false): Observable<any> {
        if (this.voltageGroupMasters != null && force != true) {
            return of(this.voltageGroupMasters);
        }
        return this.httpClient.get(`${_BASE_URL}/voltage-group-masters`).pipe(
            map(voltageGroupMasters => {
                this.voltageGroupMasters = voltageGroupMasters;
                return voltageGroupMasters;
            })
        );
    }
    public getMetricMasters(force: boolean = false): Observable<any> {
        if (this.metricMasters != null && force != true) {
            return of(this.metricMasters);
        }
        return this.httpClient.get(`${_BASE_URL}/metric-masters`).pipe(
            map(metricMasters => {
                this.metricMasters = metricMasters;
                return metricMasters;
            })
        );
    }

    public getZoneCycle(description, force: boolean = false): Observable<any> {
        if (this.zoneCycles != null && force != true) {
            return of(this.zoneCycles);
        }
        return this.httpClient.get(`${_BASE_URL}/zone-cycles/${description}`).pipe(
            map(zoneCycles => {
                this.zoneCycles = zoneCycles;
                return zoneCycles;
            })
        );
    }

    public getZoneByProvince(provinceId, description, force: boolean = false): Observable<any> {
        if (this.zoneCycles != null && force != true) {
            return of(this.zoneCycles);
        }
        return this.httpClient.get(`/api/config/metering/zone-cycle/province/${provinceId}/${description}`).pipe(
            map(zoneCycles => {
                this.zoneCycles = zoneCycles;
                return zoneCycles;
            })
        );
    }

    // public getZoneCycleRelation(description, force: boolean = false, provinceId?): Observable<any> {

    //     if (this.zoneCycles != null && force != true) {
    //         return of(this.zoneCycles);
    //     }
    //     const PATH = provinceId != undefined ? `${_BASE_URL}/zone-cycles-relation/${description}/${provinceId}` : `${_BASE_URL}/zone-cycles-relation/${description}`;
    //     return this.httpClient.get(PATH).pipe(
    //         map(zoneCycles => {
    //             this.zoneCycles = zoneCycles;
    //             return this.zoneCycles;
    //         })
    //     );
    // }

    public getMeterMakeDetails(force: boolean = false): Observable<any> {
        if (this.meterMakeDetails != null && force != true) {
            return of(this.meterMakeDetails);
        }
        return this.httpClient.get(`${_BASE_URL}/meter-make-details`).pipe(
            map(meterMakeDetails => {
                this.meterMakeDetails = meterMakeDetails;
                return meterMakeDetails;
            })
        );
    }

    public getMeterCapacityMasters(force: boolean = false): Observable<any> {
        if (this.meterCapacityMasters != null && force != true) {
            return of(this.meterCapacityMasters);
        }
        return this.httpClient.get(`${_BASE_URL}/meter-capacity-masters`).pipe(
            map(meterCapacityMasters => {
                this.meterCapacityMasters = meterCapacityMasters;
                return meterCapacityMasters;
            })
        );
    }

    public convertToDariDate(date) {
        return moment(date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
    }

    public convertToGregorianDate(date) {
        return moment.from(date, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD');
    }

    public getCurrentJalaliDate() {
        return this.convertToDariDate(new Date());
    }

    greaterThan(field: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const group = control.parent;
            const fieldToCompare = group.get(field);
            const isLessThan = Number(fieldToCompare.value) > Number(control.value);
            return isLessThan ? { 'lessThan': { value: fieldToCompare.value } } : null;
        }
    }

    lessThan(field: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const group = control.parent;
            const fieldToCompare = group.get(field);
            const isGreaterThan = Number(fieldToCompare.value) < Number(control.value);
            return isGreaterThan ? { 'greaterThan': { value: fieldToCompare.value } } : null;
        }
    }
}
