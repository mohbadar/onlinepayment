import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GeneralSearchDTO } from './search-dropdown/general-search.dto';

const _BASE_URL = "/api/topbar";

@Injectable({
    providedIn: 'root'
})
export class TopbarSearchService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    public generalSearch(name: GeneralSearchDTO): Observable<any> {
        return this.httpClient.post(`${_BASE_URL}/topbar-search`, name);
    }

}