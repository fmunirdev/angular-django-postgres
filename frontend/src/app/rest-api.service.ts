import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  constructor(private http: HttpClient) {}

  send(method: string, endpoint = "", body?: object, pageIndex?: number) {
    const params = pageIndex
      ? new HttpParams().set('page', `${pageIndex}`)
      : null;

    return this.http.request(method, `/api/v1/${endpoint}`, {
      body,
      observe: 'response',
      params,
    });
  }
}
