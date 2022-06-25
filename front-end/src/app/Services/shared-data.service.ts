import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private url = 'http://localhost:3033/info/';
  constructor(private httpClient: HttpClient) {}
  getSharedInfos() {
    return this.httpClient.get<any>(this.url + 'differentsInfo');
  }
}
