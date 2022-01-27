import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const _BASE_URL = "/api/partials/layout";
@Injectable({
    providedIn: 'root'
})
export class LayoutService {

    constructor(private httpClient: HttpClient) { }

    public searchCustomer(searchTerms): Observable<any> {
        return this.httpClient.get(`${_BASE_URL}/consumer/details`, {
            params: {
                accountNumber: searchTerms.searchKey,
            }
        });
    }
}