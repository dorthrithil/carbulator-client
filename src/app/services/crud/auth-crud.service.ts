import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {ApiService} from '../core/api.service';
import {HttpBackendClientService} from '../core/http-backend-client.service';
import {ErrorMappingHttpService} from '../core/error-mapping-http.service';
import {User} from '../../models/user';

/**
 * A login response from the server. Refresh token may be null for some routes.
 */
export interface LoginResponse {
  message: string;
  user: User;
  access_token: string;
  refresh_token: string;
}

/**
 * A simple response that only contains a message.
 */
export interface MessageResponse {
  message: string;
}

/**
 * A CRUD service that performs authorization requests.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthCrudService {

  constructor(private httpBackend: HttpBackendClientService,
              private http: ErrorMappingHttpService,
              private api: ApiService) {
  }

  /**
   * Returns http headers with a refresh token as bearer.
   * @param refreshToken Refresh token that should be used in header.
   * @return Http headers.
   */
  private static getRefreshTokenHeaders(refreshToken: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${refreshToken}`,
      'Content-Type': 'application/json'
    });
  }

  /**
   * Performs a login HTTP request.
   * @param username Username to log in with.
   * @param password Password to log in with.
   * @return Returns an Observable that resolves to a login response.
   */
  public login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.api.auth.login(), {username: username, password: password});
  }

  /**
   * Performs a login refresh HTTP request.
   * @param refreshToken Current refresh token.
   * @return Returns an Observable that resolves to a login response.
   */
  public loginRefresh(refreshToken: string): Observable<LoginResponse> {
    const headers = AuthCrudService.getRefreshTokenHeaders(refreshToken);
    return this.httpBackend.post<LoginResponse>(this.api.auth.loginRefresh(), null, {headers: headers});
  }

  /**
   * Performs a access token logout. This will blacklist the access token.
   * @param  accessToken Current access token.
   * @return Observable that resolves to a message response.
   */
  public logoutAccess(accessToken: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(this.api.auth.logoutAccess(), null);
  }

  /**
   * Performs a refresh token logout. This will blacklist the refresh token.
   * @param  refreshToken Current refresh token.
   * @return Observable that resolves to a message response.
   */
  public logoutRefresh(refreshToken: string): Observable<MessageResponse> {
    const headers = AuthCrudService.getRefreshTokenHeaders(refreshToken);
    return this.httpBackend.post<MessageResponse>(this.api.auth.logoutRefresh(), null, {headers: headers});
  }

  /**
   * Registers a user on the server.
   * @param username Username of the new user.
   * @param password Password of the new user.
   * @return Returns an observable that resolves to a login response.
   */
  public register(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.api.auth.register(), {username: username, password: password});
  }

  /**
   * Requests a reset password mail.
   * @param identification Username or email to identify the user with
   * @return Returns an Observable that resolves to a message response.
   */
  public forgotPassword(identification: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(this.api.auth.forgotPassword(), {identification: identification});
  }

  /**
   * Requests a reset password mail.
   * @param newPassword New password for the user.
   * @param resetPasswordHash Hash to validate that the user actually requested to reset the password.
   * @return Returns an Observable that resolves to a login response.
   */
  public resetPassword(newPassword: string, resetPasswordHash: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.api.auth.resetPassword(),
      {newPassword: newPassword, resetPasswordHash: resetPasswordHash});
  }

}
