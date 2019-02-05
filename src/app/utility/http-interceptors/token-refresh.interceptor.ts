import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../../services/core/auth.service';
import {Observable} from 'rxjs';
import {AuthCrudService, LoginResponse} from '../../services/crud/auth-crud.service';
import {switchMap} from 'rxjs/operators';

/**
 * Http interceptor that chains an additional token refresh request if the access token is expired.
 */
@Injectable()
export class TokenRefreshInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService,
              private authCrudService: AuthCrudService) {
  }

  /**
   * Intercepts http requests and chains an additional token refresh request if the access token is expired.
   * @param request request to intercept.
   * @param next Http handler for the request.
   * @return Returns an Observable that resolves to an http event.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getIsLoggedIn().pipe(switchMap(isLoggedIn => {
      if (isLoggedIn && !this.authService.checkAccessTokenValidity()) {
        return this.authCrudService.loginRefresh(this.authService.refreshToken).pipe(
          switchMap((loginResponse: LoginResponse) => {
            this.authService.unpackLoginResponse(loginResponse);
            return next.handle(request);
          })
        );
      }
      return next.handle(request);
    }));
  }

}
