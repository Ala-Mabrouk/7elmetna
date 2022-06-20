import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initData();
  }
  initData() {
    let idP = this.route.snapshot.params['Pid'];
    this.projectService.getProjectDetails(idP).subscribe((res: any) => {
      console.log(res[0]);
      this.projectValue = Project.fillProjectFromJSON(res[0]);
    });
  }
  fileChange(element: any) {
    this.uploadedFiles = element.target.files;
  }
  upload() {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      const extension = this.uploadedFiles[i].name.substring(
        this.uploadedFiles[i].name.lastIndexOf('.'),
        this.uploadedFiles[i].name.length
      ); //chnaging file name to smthing identified :
      // projectName_dateAdded.ext
      const newName =
        this.projectValue.projectFullName +
        '_' +
        new Date().toISOString() +
        extension;

      formData.append('uploads[]', this.uploadedFiles[i], newName);
    }

    this.http
      .post('http://localhost:3033/project/getProjectMedia', formData)
      .subscribe((response: any) => {
        console.log('response received is ', response);
      });
  }
}
