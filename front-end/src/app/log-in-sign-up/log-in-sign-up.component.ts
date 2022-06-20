import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-in-sign-up',
  templateUrl: './log-in-sign-up.component.html',
  styleUrls: ['./log-in-sign-up.component.css']
})
export class LogInSignUpComponent implements OnInit {
  infoClass = 'container';

  constructor() {}

  ngOnInit(): void {}

  moveSignUp() {
    this.infoClass = 'container right-panel-active';
  }
  moveSignIn() {
    this.infoClass = 'container ';
  }

  // SignUp() {
  //   let tempUser = new User(
  //     '12345',
  //     'tempUser',
  //     'tempUser',
  //     'tempUser@mail.fr',
  //     'tempUserPass',
  //     '88556633',
  //     3
  //   );
  //   console.log(tempUser);
  //   this.userservice.joinUs(tempUser).subscribe((rep: any) => {
  //     console.log('join us clicked ');
  //   });
  // }
}
