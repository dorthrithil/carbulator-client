import {Injectable} from '@angular/core';
import {forkJoin, Observable, of, Subject, timer} from 'rxjs';
import {Router} from '@angular/router';
import {AuthCrudService, LoginResponse} from '../crud/auth-crud.service';
import {catchError, map, takeUntil, takeWhile} from 'rxjs/operators';
import * as moment from 'moment';
import * as JWT from 'jwt-decode';
import {NotificationsService} from 'angular2-notifications';
import {bigIntTimer} from '../../utility/observables/bigint-timer';

/**
 * A JSON Web Token.
 */
interface DecodedJWT {
  iat: number;
  nbf: number;
  jti: string;
  exp: number;
  identity: string;
  fresh: boolean;
  type: string;
}

/**
 * Service for handling authorization of the app.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn = false;
  private _accessToken: string = null;
  private accessTokenExpires: moment.Moment = null;
  private _refreshToken: string = null;
  private _refreshTokenExpires: moment.Moment = null;
  private loginStateChangesSubject: Subject<boolean>;
  private onRefreshTokenAboutToExpireSubject: Subject<number>;
  private onLogoutSubject: Subject<boolean>;
  private onLoginSubject: Subject<boolean>;

  public onLoginStateChanges: Observable<boolean>;
  public onRefreshTokenAboutToExpire: Observable<number>;
  public onLogout: Observable<boolean>;
  public onLogin: Observable<boolean>;

  constructor(private router: Router,
              private notificationsService: NotificationsService,
              private authCrud: AuthCrudService) {
    this.loginStateChangesSubject = new Subject<boolean>();
    this.onLoginStateChanges = this.loginStateChangesSubject.asObservable();
    this.loginStateChangesSubject.next(this.isLoggedIn);
    this.onRefreshTokenAboutToExpireSubject = new Subject();
    this.onRefreshTokenAboutToExpire = this.onRefreshTokenAboutToExpireSubject.asObservable();
    this.onLoginSubject = new Subject<boolean>();
    this.onLogin = this.onLoginSubject.asObservable();
    this.onLogoutSubject = new Subject<boolean>();
    this.onLogout = this.onLogoutSubject.asObservable();
  }

  /**
   * Returns true if the user is logged in.
   * @return True if the user is logged in.
   */
  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  /**
   * Returns the current access token.
   * @return Access token.
   */
  get accessToken(): string {
    return this._accessToken;
  }

  /**
   * Returns the current refresh token.
   * @return Refresh token.
   */
  get refreshToken(): string {
    return this._refreshToken;
  }

  /**
   * Returns the expiry moment of the refresh token.
   * @return Refresh token expiry moment.
   */
  get refreshTokenExpires(): moment.Moment {
    return this._refreshTokenExpires;
  }

  /**
   * Loggs in a user.
   * @param username Username to log in with.
   * @param password Password to log in with.
   * @return Resolves to an Observable of true on success. Of false otherwise.
   */
  public login(username: string, password: string): Observable<boolean> {
    return this.authCrud.login(username, password).pipe(
      map((response: LoginResponse) => {
        this.afterLoginOrResitrationSuccess(response);
        this.notificationsService.success('Login erfolgreich', 'Du bist jetzt eingelogt.');
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  /**
   * Registers a user to the application. On successful registration he is automatically logged in.
   * @param username Username to log in with.
   * @param password Password to log in with.
   * @return Resolves to an Observable of true on success. Of false otherwise.
   */
  public register(username: string, password: string): Observable<boolean> {
    return this.authCrud.register(username, password).pipe(
      map((response: LoginResponse) => {
        this.afterLoginOrResitrationSuccess(response);
        this.notificationsService.success('Registrierung erfolgreich', 'Du bist jetzt eingelogt.');
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  /**
   * Performs necessary actions after successful login or registration.
   * @param response Login/Registration response form the server.
   */
  private afterLoginOrResitrationSuccess(response: LoginResponse) {
    this.unpackLoginResponse(response);
    this._isLoggedIn = true;
    this.loginStateChangesSubject.next(this.isLoggedIn);
    this.onLoginSubject.next(true);
    this.router.navigate(['']);
    this.startRefreshTokenAboutToExpireTimer();
  }

  /**
   * Starts a timer that refreshes the access token before it expires. When the timer finishes, a login refresh request is performed
   * and the cycle is started recursively.
   */
  private startRefreshTimer() {
    const now = moment();
    const validityDelta = this.accessTokenExpires.diff(now);
    if (validityDelta > 0) {
      timer(Math.round(2 / 3 * validityDelta))
        .pipe(
          takeWhile(() => this.isLoggedIn)
        ).subscribe(() => {
        this.authCrud.loginRefresh(this.refreshToken).subscribe(response => this.unpackLoginResponse(response));
      });
    }
  }

  /**
   * Unpacks the values of a login response and starts the refresh timer is a new access token is found.
   * @param loginResponse Login response from the server that may contain a refresh and an access token.
   */
  private unpackLoginResponse(loginResponse: LoginResponse) {
    if (loginResponse.refresh_token !== null) {
      this._refreshToken = loginResponse.refresh_token;
      const refreshTokenDecoded: DecodedJWT = JWT(loginResponse.refresh_token);
      this._refreshTokenExpires = moment.unix(refreshTokenDecoded.exp);
    }
    if (loginResponse.access_token !== null) {
      this._accessToken = loginResponse.access_token;
      const accessTokenDecoded: DecodedJWT = JWT(loginResponse.access_token);
      this.accessTokenExpires = moment.unix(accessTokenDecoded.exp);
      this.startRefreshTimer();
    }
    this.persistTokens();
  }

  /**
   * Persists current tokens in the local storage.
   */
  private persistTokens() {
    const autoLoginObject: LoginResponse = {
      access_token: this._accessToken,
      refresh_token: this._refreshToken,
      message: ''
    };
    localStorage.setItem('CarbulatorAuth', JSON.stringify(autoLoginObject));
  }

  /**
   * Performs an auto login by attempting to reuse old tokens from the local storage.
   */
  public tryAutoLogin() {
    const autoLoginObject: LoginResponse = JSON.parse(localStorage.getItem('CarbulatorAuth'));
    if (autoLoginObject !== null) {
      this.unpackLoginResponse(autoLoginObject);
      if (this.checkTokenValidity()) {
        this._isLoggedIn = true;
        this.loginStateChangesSubject.next(this.isLoggedIn);
        this.onLoginSubject.next(true);
        this.startRefreshTokenAboutToExpireTimer();
      } else {
        localStorage.setItem('CarbulatorAuth', null);
      }
    }
  }

  /**
   * Checks if access and refresh token are valid.
   * @return Returns True if both are valid, False otherwise.
   */
  private checkTokenValidity(): boolean {
    const now = moment();
    return !(this._refreshTokenExpires.isBefore(now) || this.accessTokenExpires.isBefore(now));
  }

  /**
   * Logs out the user.
   */
  public logout(isAutoLogout = false) {
    const logoutAccess = this.authCrud.logoutAccess(this.accessToken);
    const logoutRefresh = this.authCrud.logoutRefresh(this.refreshToken);
    forkJoin([logoutAccess, logoutRefresh]).subscribe(([accessResponse, refreshResponse]) => {
      localStorage.setItem('CarbulatorAuth', null);
      this._isLoggedIn = false;
      this.loginStateChangesSubject.next(this.isLoggedIn);
      this.onLogoutSubject.next(true);
      this.router.navigate(['login']);
      if (!isAutoLogout) {
        this.notificationsService.info('Logout erfolgreich', 'Du hast dich ausgelogt.');
      } else {
        this.notificationsService.info('Du wurdest ausgelogt', 'Da du deine Session nicht erneuert hast mussten wir dich' +
          ' aus Sicherheitsgründen automatisch ausloggen.');
      }
    });
  }

  /**
   * Starts a timer that emits five minutes before the refresh token expires. The onRefreshTokenAboutToExpire observable will then emit
   * and notify subscribers about this event. Also a timer is started that logs out the user automatically if he doesn't refresh his
   * session.
   */
  private startRefreshTokenAboutToExpireTimer() {
    const now = moment();
    const fiveMinutesBeforeEpiry = this.refreshTokenExpires.clone().subtract(5, 'minutes');
    const oneMinuteBeforeEpiry = this.refreshTokenExpires.clone().subtract(1, 'minutes');
    let difference = fiveMinutesBeforeEpiry.diff(now);
    if (difference < 0) {
      difference = 0;
    }
    bigIntTimer(difference).pipe(
      takeUntil(this.onLogout)
    ).subscribe(() => {
      const msUntilOneMinuteBeforeExpiry = oneMinuteBeforeEpiry.diff(moment());
      this.onRefreshTokenAboutToExpireSubject.next(msUntilOneMinuteBeforeExpiry);
    });
    bigIntTimer(this.refreshTokenExpires.diff(now)).pipe(
      takeUntil(this.onLogout)
    ).subscribe(() => {
      this.logout(true);
    });
  }

}
