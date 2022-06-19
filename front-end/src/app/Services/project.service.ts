import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private url = 'http://localhost:3033/project/allProjects';
  constructor(private httpClient: HttpClient) {}
  getAllProject() {
    return this.httpClient.get(this.url);
  }
}
