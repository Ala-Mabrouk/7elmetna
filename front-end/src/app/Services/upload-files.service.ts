import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadFilesService {
  constructor(private http: HttpClient) {}
  uploadFiles(file: File, pName: string): Observable<HttpEvent<any>> {
    const formData = new FormData();
    //chnaging file name to smthing identified :
    // projectName_dateAdded.ext
    const extension = file.name.substring(
      file.name.lastIndexOf('.'),
      file.name.length
    );
    const postFix = Math.random().toString(36).substring(2, 5);
    const newName =
      pName + '_' + new Date().toDateString() + '_' + postFix + extension;
    formData.append('uploadedImage', file, newName);
    const req = new HttpRequest(
      'POST',
      'http://localhost:3033/files/upload',
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
    return this.http.request(req);
  }
}
