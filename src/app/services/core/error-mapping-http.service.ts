import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';

/**
 * Wrapper of the http client that maps errors to simple strings for easier handling.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorMappingHttpService {

  constructor(private http: HttpClient) {
  }

  /**
   * Maps an http error to a string observable with the error message.
   * @param error Error to map to string.
   * @return Observable that resolves to an error message string for further handling.
   */
  private static mapError(error: any): Observable<string | any> {
    if (error.error['message']) {
      return throwError(error.error['message']);
    }
    return throwError('UNKNOWN_ERROR');
  }

  /**
   * Performs a http post request.
   * @param url Request URL.
   * @param body Request body.
   * @return Observable of the body of type T.
   */
  public post<T>(url: string, body: any) {
    return this.http.post<T>(url, body).pipe(
      catchError(error => ErrorMappingHttpService.mapError(error))
    );
  }

}
