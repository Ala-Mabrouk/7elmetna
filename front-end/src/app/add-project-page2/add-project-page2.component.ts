import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from '../Services/project.service';
import { UploadFilesService } from '../Services/upload-files.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-add-project-page2',
  templateUrl: './add-project-page2.component.html',
  styleUrls: ['./add-project-page2.component.css'],
})
export class AddProjectPage2Component implements OnInit {
  ProjectInfo: any;
  newMontant: number = 0;
  projectValue: any;
  selectedFiles?: FileList;
  selectedVedioFiles?: FileList;
  currentFile?: File;

  fileInfos?: Observable<any>;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;

  userLoged: any;
  uId: any;
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private routeA: Router,
    private userServices: UserService,
    private formBuilder: FormBuilder,
    private uploadFileServices: UploadFilesService
  ) {}
  ngOnInit(): void {
    this.ProjectInfo = history.state.data;
    this.newMontant = this.ProjectInfo.projectDemand * 1.1;
    console.log(this.ProjectInfo);
    this.getLogedUserInfo();
  }
  async getLogedUserInfo() {
    const a = await this.userServices
      .getUserInfo()
      .toPromise()
      .then((res: any) => {
        this.uId = res[0].userId;
        return res[0];
      });
    this.userLoged = a;

    return a;
  }

  selectVedio(event: any): void {
    this.selectedVedioFiles = event.target.files;
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }
  uploadFiles(): void {
    this.message = [];
    console.log();
    let initint = 0;
    if (this.selectedVedioFiles) {
      this.upload(0, this.selectedVedioFiles[0]);
      initint++;
    }

    if (this.selectedFiles) {
      for (let i = initint; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i - 1]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      this.uploadFileServices
        .uploadFiles(file, this.ProjectInfo.projectId)
        .subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progressInfos[idx].value = Math.round(
                (100 * event.loaded) / event.total
              );
            } else if (event instanceof HttpResponse) {
              const msg = 'Uploaded the file successfully: ' + file.name;
              this.message.push(msg);
            }
          },
          (err: any) => {
            this.progressInfos[idx].value = 0;
            const msg = 'Could not upload the file: ' + file.name;
            this.message.push(msg);
          }
        );
      this.routeA.navigate(['/allproject']);
    }
  }

  addProject() {}
}
