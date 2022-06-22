import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../Services/project.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-my-project',
  templateUrl: './my-project.component.html',
  styleUrls: ['./my-project.component.css'],
})
export class MyProjectComponent implements OnInit {
  listofProjects: any;
  private uId: any = '';
  userLoged: any;
  etat: any = 'false';
  constructor(
    private projectServices: ProjectService,
    private userServices: UserService
  ) {}

  ngOnInit(): void {
    this.initData();
    if (this.userLoged.userNumCardFunding == null) {
      this.etat = 'true';
    }
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
  async initData() {
    const u = await this.getLogedUserInfo();
    this.projectServices.getProjectOfLogedUser(u.userId).subscribe((res) => {
      this.listofProjects = res;
      for (let index = 0; index < this.listofProjects.length; index++) {
        const element = this.listofProjects[index];
        console.log(element);
      }
    });
  }
}
