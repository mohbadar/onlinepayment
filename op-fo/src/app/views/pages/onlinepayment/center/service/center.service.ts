import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const _BASE_URL = "/api/centers";
@Injectable({
  providedIn: 'root'
})
export class CenterService {

  constructor(private httpClient: HttpClient) { }


  public get(): Observable<any> {
    return this.httpClient.get(`${_BASE_URL}`);
  }

  public loadById(id: string): Observable<any> {
    return this.httpClient.get(`${_BASE_URL}/${id}`);
  }


  public loadByName(name: string): Observable<any> {
    return this.httpClient.get(`${_BASE_URL}/name/${name}`);
  }

  public loadByCode(code: string): Observable<any> {
    return this.httpClient.get(`${_BASE_URL}/code/${code}`);
  }


  public create(data): Observable<any> {
    return this.httpClient.post(`${_BASE_URL}`, data);
  }


  public update(id, data): Observable<any> {
    return this.httpClient.put(`${_BASE_URL}/${id}`, data);
  }


  public delete(id: string): Observable<any> {
    return this.httpClient.delete(`${_BASE_URL}/${id}`);
  }

  public createCenterUserRelation(data): Observable<any> {
    return this.httpClient.post(`${_BASE_URL}/center-user-relation`, data);
  }

  public getUserTenants(userName): Observable<any> {
    return this.httpClient.get(`${_BASE_URL}/user-centers`, {
      params: {
        "userName": userName
      }
    });
  }

  public setTenant(centerId: String, userName: String): Observable<any> {
    return this.httpClient.post(`/api/config/user-management/user-tenant`, {
      "userId": userName,
      "tenant": centerId
    });
  }

  public getRevisions(id: string): Observable<any> {
    console.log("id", id);
    return this.httpClient.get(`${_BASE_URL}/revision/${id}`);
  }

  getUsers(): Observable<any> {
    return this.httpClient.get(`${_BASE_URL}/users`);
  }

}
