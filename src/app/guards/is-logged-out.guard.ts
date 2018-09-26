import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from '../services/core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedOutGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  /**
   * Lets the router activate the route if the user is logged out.
   * @return True if the user van activate the route.
   */
  canActivate(): boolean {
    return !this.authService.isLoggedIn;
  }

}
