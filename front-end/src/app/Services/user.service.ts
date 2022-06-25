import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:3033/user/';
  constructor(private httpClient: HttpClient) {}

  joinUs(userData: any) {
    return this.httpClient.post<any>(this.url + 'signup', userData);
  }
  login(user: any) {
    return this.httpClient.post<any>(this.url + 'login', user);
  }
  isLogedIn() {
    let tempToken = localStorage.getItem('user_web_token');
    let tempRes = false;
    if (tempToken != null) {
      // let data = { user_web_token: tempToken };
      // this.httpClient
      //   .post<any>('http://localhost:3033/user/verifToken', data)
      //   .toPromise()
      //   .then((res) => {
      //     if (res == 'valid token') {
      //       tempRes = true;
      //     }
      //   });
      // console.log(tempRes);
      tempRes = true;
      return tempRes;
    } else {
      return tempRes;
    }
  }

  getUserInfo() {
    const t = localStorage.getItem('user_web_token');
    return this.httpClient.get(this.url + t);
  }

  getUserInfoById(id: String) {
    return this.httpClient.get(this.url + 'byID/' + id);
  }
}
