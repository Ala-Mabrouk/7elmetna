import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { __await } from 'tslib';
import { Project } from '../Models/project';
import { ProjectService } from '../Services/project.service';
import { UploadFilesService } from '../Services/upload-files.service';
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  projectValue: any;
  selectedFiles?: FileList;
  currentFile?: File;

  fileInfos?: Observable<any>;
  progressInfos: any[] = [];
  message: string[] = [];
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,

    private formBuilder: FormBuilder,
    private uploadFileServices: UploadFilesService
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    let idP = this.route.snapshot.params['Pid'];
    this.projectService.getProjectDetails(idP).subscribe((res: any) => {
      console.log(res);
      this.projectValue = res;
    });
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }
  uploadFiles(): void {
    this.message = [];
    console.log();

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }
  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      this.uploadFileServices
        .uploadFiles(file, this.route.snapshot.params['Pid'])
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
    }
  }
}
