import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../Services/project.service';
import { Project } from '../Models/project';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-all-project',
  templateUrl: './all-project.component.html',
  styleUrls: ['./all-project.component.css'],
})
export class AllProjectComponent implements OnInit {
  listAllProject: Array<Project> = [];
  displayedList: Array<Project> = [];
  valProject: any;
  // elementType = NgxQrcodeElementTypes.URL;
  // correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  // value = 'https://www.techiediaries.com/';
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.projectService.getAllProject().subscribe((res: any) => {
      this.listAllProject = res;
      this.displayedList = this.listAllProject;
    });
  }
  filterData(domaine: any) {
    if (domaine == 'Tous') {
      this.displayedList = this.listAllProject;
    } else {
      this.displayedList = this.listAllProject.filter(
        (project) => project.projectDomaine == domaine
      );
    }
  }
}
