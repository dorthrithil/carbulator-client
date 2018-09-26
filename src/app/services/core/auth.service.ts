import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn = false;
  public loginStateChanges: Observable<boolean>;
  public loginStateChangesSubject: Subject<boolean>;

  constructor(private router: Router) {
    this.loginStateChangesSubject = new Subject<boolean>();
    this.loginStateChanges = this.loginStateChangesSubject.asObservable();
    this.loginStateChangesSubject.next(this.isLoggedIn);
  }

  /**
   * Returns true if the user is logged in.
   * @return True if the user is logged in.
   */
  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  public fakeLogIn() {
    this._isLoggedIn = true;
    this.loginStateChangesSubject.next(this.isLoggedIn);
    this.router.navigate(['']);
  }
}
