import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CardFundingService } from '../Services/card-funding.service';
import { ProjectService } from '../Services/project.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-add-user-card',
  templateUrl: './add-user-card.component.html',
  styleUrls: ['./add-user-card.component.css'],
})
export class AddUserCardComponent implements OnInit {
  private uId: any = '';
  userLoged: any;
  addCardPform: any = FormGroup;
  constructor(
    private projectServices: ProjectService,
    private userServices: UserService,
    private formBuilder: FormBuilder,
    private cardService: CardFundingService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getLogedUserInfo();
    this.addCardPform = this.formBuilder.group({
      cardNb: [null],
      CIN: [null],

      Code8: [null],
      DateExp: [null],
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
}
