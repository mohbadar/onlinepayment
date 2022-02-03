import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const _BASE_URL = "/api/organization-admin";
@Injectable({
    providedIn: 'root'
})
export class OrganizationAdminService {

    constructor(private httpClient: HttpClient) { }

    getDateBasedReport(data: any): Observable<any> {
        return this.httpClient.post(`${_BASE_URL}/get-date-based-statement`, data);
    }
}
