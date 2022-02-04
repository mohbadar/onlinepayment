import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OnlineBillPayment } from '../model/agent-online-bill-payment.model';

const _BASE_URL = "/api/agents";
@Injectable({
  providedIn: 'root'
})
export class AgentService {
  

  constructor(private httpClient: HttpClient) { }


  public get(): Observable<any> {
    return this.httpClient.get(`${_BASE_URL}`);
  }

  public loadById(id: string): Observable<any> {
    return this.httpClient.get(`${_BASE_URL}/${id}`);
  }


  public loadByPhone(phone: string): Observable<any> {
    return this.httpClient.get(`${_BASE_URL}/phone/${phone}`);
  }

  public loadByAccountNo(accountNo: string): Observable<any> {
    return this.httpClient.get(`${_BASE_URL}/account-no/${accountNo}`);
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

  public createAgentUserRelation(data): Observable<any> {
    return this.httpClient.post(`${_BASE_URL}/agent-user-relation`, data);
  }

  public getUserTenants(userName): Observable<any> {
    return this.httpClient.get(`${_BASE_URL}/user-agents`, {
      params: {
        "userName": userName
      }
    });
  }

  public setTenant(agentId: String, userName: String): Observable<any> {
    return this.httpClient.post(`/api/config/user-management/user-tenant`, {
      "userId": userName,
      "tenant": agentId
    });
  }

  public getRevisions(id: string): Observable<any> {
    console.log("id", id);
    return this.httpClient.get(`${_BASE_URL}/revision/${id}`);
  }

  getUsers(): Observable<any> {
    return this.httpClient.get(`${_BASE_URL}/users`);
  }


  saveRectifiedJournalCredit(data: any) : Observable<any>{
    return this.httpClient.post(`${_BASE_URL}/agent-account-credit`, data);
  }

  
  saveRectifiedJournalDebit(data: any) : Observable<any>{
    return this.httpClient.post(`${_BASE_URL}/agent-account-debit`, data);
  }

  makeAgentPayment(data: any) : Observable<any>{
    return this.httpClient.post(`${_BASE_URL}/make-agent-payment`, data);
  }

  queryBill(billNo) : Observable<any>{
    return this.httpClient.post(`${_BASE_URL}/query-bill`, billNo);
  }

  postCollection(data: any): Observable<any>{
    return this.httpClient.post(`${_BASE_URL}/collect`, data);
  }
  queryDuplicateBillForAwizPrint(billNo): Observable<any> {
    return this.httpClient.post(`${_BASE_URL}/print-duplicate-slip`, billNo);
  }


  getBalanceSheet(accountNo) :Observable<any> {
    return this.httpClient.post(`${_BASE_URL}/get-balance-sheet`, accountNo);
  }
  
  queryBillPaymentInfo(receiptNo):Observable<any> {
    return this.httpClient.post(`${_BASE_URL}/query-bill-payment`, receiptNo);
  }

  confirmPayment(paymentId) :Observable<any> {
    return this.httpClient.post(`${_BASE_URL}/confirm-payment`, paymentId);
  }


  getUserBillStatement() :Observable<any> {
    return this.httpClient.get(`${_BASE_URL}/get-user-bill-statement`);
  }

  getAgentFees(accountNo): Observable<any>{
    return this.httpClient.get(`${_BASE_URL}/agent-fees/${accountNo}`);
  }


  sendFeeApprovals(data:any): Observable<any>{
    return this.httpClient.post(`${_BASE_URL}/fee-approvals`, data);
  }

  queryOnlineBillInfo(data:OnlineBillPayment): Observable<any>{
    return this.httpClient.post(`${_BASE_URL}/query-online-bill-info`, data);
  }


  confirmOnlinePayment(bill): Observable<any> {
    return this.httpClient.post(`${_BASE_URL}/confirm-online-bill-payment`, bill);
  }
}
