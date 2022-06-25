import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../Services/project.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  projectDataInfo: any = {};
  projectForm1: any = FormGroup;
  domaine: String = '';
  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private projectServices: ProjectService,
    private userservices: UserService
  ) {}

  ngOnInit(): void {
    this.projectForm1 = this.formBuilder.group({
      FullName: [null],
      Domaine: [null],
      LocalProject: [null],
      description: [null],
      Montant: [null],
      projectLimits: [],
    });
  }
  selectChangeHandler(event: any) {
    //update the ui
    this.domaine = event.target.value;
  }
  async moveNext() {
    //getting form values
    var formValues = this.projectForm1.value;
    this.projectDataInfo = {
      projectShortName: formValues.FullName,
      projectFullName: formValues.FullName,
      projectDomaine: this.domaine,
      projectLocation: formValues.LocalProject,
      projectFullDescription: formValues.description,
      projectShortDescription: formValues.description,
      projectDemand: formValues.Montant,
      projectLimits: formValues.projectLimits,
    };
    //getting user id
    await this.userservices
      .getUserInfo()
      .toPromise()
      .then((res: any) => {
        this.projectDataInfo.projectOwner = res[0].userId;
      })
      .catch((err: any) => {
        console.log(err);
      });

    //saving project to data base
    let newProjectId;
    await this.projectServices
      .addNewProject(this.projectDataInfo)
      .toPromise()
      .then((res: any) => {})
      .catch((err: any) => {
        console.log(err);
      });
    await this.projectServices
      .getProjectByName(this.projectDataInfo.projectFullName)
      .toPromise()
      .then((res: any) => {
        console.log('res is ');
        console.log(res[0]);
        newProjectId = res[0].projectId;
      })
      .catch((err: any) => {
        console.log(err);
      });
    this.projectDataInfo.projectId = newProjectId;
    if (this.projectDataInfo.projectId != null)
      this.route.navigate(['/addproject2'], {
        state: { data: this.projectDataInfo },
      });
  }
}
