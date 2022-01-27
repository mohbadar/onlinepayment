import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { FileDownloadService } from "app/core/service/file-download.service";

const _BASE_URL = "/api/nid";

@Injectable({
  providedIn: "root",
})
export class PdaService {
  constructor(
    private http: HttpClient,
    private fileDownloadService: FileDownloadService
  ) {}

  public store(data): Observable<any> {
    return this.http.post(`${_BASE_URL}/process-docs/store`, data);
  }

  public search(familyNo): Observable<any> {
    return this.http.get(`${_BASE_URL}/process-docs/search/${familyNo}`);
  }

  public download(data): Observable<any> {
    return this.http.post(`${_BASE_URL}/process-docs/download`, data, {
      responseType: "blob",
    });
  }

  public getUnVerifiedDocs(data: any): Observable<any> {
    return this.http.post(`${_BASE_URL}/process-docs/verification/list`, data);
  }

  public verify(id: any): Observable<any> {
    return this.http.get(`${_BASE_URL}/process-docs/verification/verify/${id}`);
  }
}
