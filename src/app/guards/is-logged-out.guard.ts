import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedOutGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  /**
   * Lets the router activate the route if the user is logged out.
   * @return True if the user van activate the route.
   */
  canActivate(): boolean {
    if (!this.authService.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['']);
    }
    return false;
  }

}
