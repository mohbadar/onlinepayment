import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// Do npm install file-saver --save
import { FileDownloadService } from 'app/core/service/file-download.service';

const _BASE_URL = "/api/user-management";

@Injectable({
    providedIn: 'root'
})
export class UserManagementService {

    constructor(
        private httpClient: HttpClient,
        private fileDownloadService: FileDownloadService,
    ) { }


    createUserRoleRelation(record) {
        return this.httpClient.post(`${_BASE_URL}/user-role-relation`, record);
    }

    public getUsers(): Observable<any> {
        return this.httpClient.get(`${_BASE_URL}/users`);
    }


    public create(data): Observable<any> {
        return this.httpClient.post(`${_BASE_URL}`, data);
    }


    public getRoles(): Observable<any> {
        return this.httpClient.get(`${_BASE_URL}/roles`);
    }

    public getRolesByUserId(id: string): Observable<any> {
        return this.httpClient.get(`${_BASE_URL}/roles/${id}`);
    }
    public update(id, data): Observable<any> {
        console.log("id", id);
        return this.httpClient.put(`${_BASE_URL}/${id}`, data);
    }
    public delete(id: number): Observable<any> {
        return this.httpClient.delete(`${_BASE_URL}/${id}`);
    }

    public saveNewPassword(formData): Observable<any> {
        return this.httpClient.post(`${_BASE_URL}/change-password`, formData);
    }
}
