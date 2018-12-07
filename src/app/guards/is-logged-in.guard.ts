import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/core/auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  /**
   * Lets the router activate the route if the user is logged in.
   * Else, he is rerouted to the login page.
   * @return Observable that resolves to true if the user can activate the route.
   */
  canActivate(): Observable<boolean> {
    return this.authService.getIsLoggedIn().pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          return true;
        }
        this.router.navigate(['login']);
        return false;
      })
    );
  }
}
