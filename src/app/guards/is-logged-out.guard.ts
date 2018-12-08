import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/core/auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedOutGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  /**
   * Lets the router activate the route if the user is logged out.
   * @return Observable that resolves to true if the user can activate the route.
   */
  canActivate(): Observable<boolean> {
    return this.authService.getIsLoggedIn().pipe(
      map(isLoggedIn => {
        if (!isLoggedIn) {
          return true;
        }
        this.router.navigate(['']);
        return false;
      })
    );
  }

}
