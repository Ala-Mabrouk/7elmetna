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
  valProject: any;
  // elementType = NgxQrcodeElementTypes.URL;
  // correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  // value = 'https://www.techiediaries.com/';
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.initData();
  }
  second = 1000;
  minute = this.second * 60;
  hour = this.minute * 60;
  day = this.hour * 24;

  date1: any = new Date('05/25/2019');
  date2: any = new Date('07/30/2019');
  resDate: number = Math.floor(this.date2.getTime() - this.date1.getTime());

  days = Math.floor(this.resDate / this.day);
  hours = Math.floor((this.resDate % this.days) / this.hour);
  minutes = Math.floor((this.resDate % this.hour) / this.minute);

  initData() {
    console.log('d' + this.days);
    console.log('h' + this.hours);
    console.log('m' + this.minutes);

    this.projectService.getAllProject().subscribe((res: any) => {
      console.log(res);
      res.forEach((element: any) => {
        this.listAllProject.push(Project.fillProjectFromJSON(element));
      });
    });
  }
}
