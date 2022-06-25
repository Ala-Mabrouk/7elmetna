import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { __await } from 'tslib';
import { Project } from '../Models/project';
import { ProjectService } from '../Services/project.service';
import { UploadFilesService } from '../Services/upload-files.service';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';
import { UserService } from '../Services/user.service';

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
  previews: string[] = [];
  imageInfos?: Observable<any>;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'https://www.techiediaries.com/';
  chartyValue: any = {};
  userCardNB: String = '';
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,

    private formBuilder: FormBuilder,
    private uploadFileServices: UploadFilesService,
    private userServices: UserService
  ) {}

  ngOnInit(): void {
    this.initData();
    this.getUSerCardNb();
  }
  updateValue(event: any) {
    var valString: any = {};
    valString.value = event.target.value;
    valString.dateDon = new Date().toISOString();
    valString.projectGettingMonny = this.projectValue.projectFullName;
    valString.projectCard = this.userCardNB;
    this.chartyValue = JSON.stringify(valString);
    console.log(valString);
  }
  async initData() {
    let idP = this.route.snapshot.params['Pid'];
    await this.projectService
      .getProjectDetails(idP)
      .toPromise()
      .then((res: any) => {
        console.log(res);
        this.projectValue = res;
      })
      .catch((err: any) => {
        console.log(err);
      });
    await this.getUSerCardNb();
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
  async getUSerCardNb() {
    await this.userServices
      .getUserInfoById(this.projectValue.projectOwner)
      .toPromise()
      .then((res: any) => {
        console.log('res is');
        console.log(res[0]);

        this.userCardNB = res[0].userNumCardFunding;
      })
      .catch((err) => {
        console.log('erreur in the qdjqlkdjlf');

        console.log(err);
      });
  }
}
