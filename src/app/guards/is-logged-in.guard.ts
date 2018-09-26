import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  /**
   * Lets the router activate the route if the user is logged in.
   * Else, he is rerouted to the login page.
   * @return True if the user van activate the route.
   */
  canActivate(): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['login']);
    }
    return false;
  }
}
