import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {AuthService} from '../../services/core/auth.service';
import {Observable} from 'rxjs';

/**
 * Http interceptor that adds access tokens to requests.
 */
@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService) {
  }

  /**
   * Intercepts http requests and adds the JWT header to them.
   * @param request request to intercept.
   * @param next Http handler for the request.
   * @return Returns an Observable that resolves to an http event.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.accessToken !== null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.accessToken}`
        }
      });
    }
    return next.handle(request);
  }

}
