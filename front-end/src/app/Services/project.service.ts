import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../Models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private url = 'http://localhost:3033/project/';
  constructor(private httpClient: HttpClient) {}
  getAllProject() {
    return this.httpClient.get(this.url + 'allProjects');
  }
  getProjectDetails(pID: number) {
    return this.httpClient.get(this.url + 'getProjectDetails/' + pID);
  }
  addNewProject(p: Project, auth: String) {
    return this.httpClient.post<any>(this.url + '/newProject', p);
  }
  getProjectOfLogedUser(idU: any) {
    return this.httpClient.get(this.url + 'userProjects/' + idU);
  }
}
