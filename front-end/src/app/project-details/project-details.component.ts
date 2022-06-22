import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../Models/project';
import { ProjectService } from '../Services/project.service';
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  projectValue: Project = new Project();

  uploadedFiles: Array<File> = [];

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: any;
  fileUploadForm: any;
  fileInputLabel: any;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initData();
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: [''],
    });
  }
  initData() {
    let idP = this.route.snapshot.params['Pid'];
    this.projectService.getProjectDetails(idP).subscribe((res: any) => {
      console.log(res[0]);
      this.projectValue = Project.fillProjectFromJSON(res[0]);
    });
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('uploadedImage').setValue(file);
  }

  onFormSubmit() {
    if (!this.fileUploadForm.get('uploadedImage').value) {
      alert('Please fill valid details!');
      return false;
    }
    const formData = new FormData();
    const extension = this.fileUploadForm
      .get('uploadedImage')
      .value.name.substring(
        this.fileUploadForm.get('uploadedImage').value.name.lastIndexOf('.'),
        this.fileUploadForm.get('uploadedImage').value.name.length
      ); //chnaging file name to smthing identified :
    // projectName_dateAdded.ext
    const newName =
      this.projectValue.projectFullName +
      '_' +
      new Date().toDateString() +
      extension;
    formData.append(
      'uploadedImage',
      this.fileUploadForm.get('uploadedImage').value,
      newName
    );
    formData.append('agentId', '007');

    return this.http
      .post<any>('http://localhost:3033/files/upload', formData)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.statusCode === 200) {
            // Reset the file input
            this.uploadFileInput.nativeElement.value = '';
            this.fileInputLabel = undefined;
          }
        },
        (er) => {
          console.log(er);
          alert(er.error.error);
        }
      );
  }
}
