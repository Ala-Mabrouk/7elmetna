import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGardGuard implements CanActivate {
  constructor(private userServices: UserService, private routeGo: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let isloged = this.userServices.isLogedIn();
    // let tempres;
    // isloged
    //   .then((res) => {
    //     console.log(res);
    //     tempres = res;
    //   })
    //   .finally(() => console.log('fuck'));

    // console.log(tempres);

    if (isloged == true) {
      return true;
    } else {
      this.routeGo.navigate(['/login/' + route.url]);
      return false;
    }
  }
}
