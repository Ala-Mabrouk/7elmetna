import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CardFundingService } from '../Services/card-funding.service';
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

  addCardPform: any = FormGroup;

  constructor(
    private projectServices: ProjectService,
    private userServices: UserService,
    private formBuilder: FormBuilder,
    private cardService: CardFundingService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.initData();
    if (this.userLoged.userNumCardFunding == null) {
      this.etat = 'true';
    }
    this.addCardPform = this.formBuilder.group({
      cardNb: [null],
      CIN: [null],

      Code8: [null],
      DateExp: [null],
    });
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
    console.log('the user loged :');
    console.log(u);

    this.projectServices.getProjectOfLogedUser(u.userId).subscribe((res) => {
      this.listofProjects = res;
      for (let index = 0; index < this.listofProjects.length; index++) {
        const element = this.listofProjects[index];
        console.log(element);
      }
    });
  }

  saveCardData() {
    var formValues = this.addCardPform.value;
    var userCard = {
      numCard: formValues.cardNb,
      CIN: formValues.CIN,
      Code8: formValues.Code8,
      DateExp: formValues.DateExp,
      idUser: this.uId,
    };
    console.log(userCard);

    this.cardService.addCardFunding(userCard).subscribe((res: any) => {
      if (res != null) {
        console.log(res);
        this.route.navigate(['addproject']);
      }
    });
  }
}
