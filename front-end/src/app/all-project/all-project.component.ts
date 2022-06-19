import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../Services/project.service';
import { Project } from '../Models/project';

@Component({
  selector: 'app-all-project',
  templateUrl: './all-project.component.html',
  styleUrls: ['./all-project.component.css'],
})
export class AllProjectComponent implements OnInit {
  listAllProject: Array<Project> = [];
  valProject: any;
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.projectService.getAllProject().subscribe((res: any) => {
      console.log(res);
      res.forEach((element: any) => {
        this.listAllProject.push(Project.fillProjectFromJSON(element));
      });
      this.valProject = 'width: ';
      this.valProject +=
        (this.listAllProject[0].projectEarned /
          this.listAllProject[0].projectDemand) *
        100;
      this.valProject += '%';
      console.log(this.valProject);
    });
  }
}
