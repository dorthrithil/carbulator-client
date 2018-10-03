import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NotificationsService} from 'angular2-notifications';
import {knownErrors} from '../../utility/errors/known-errors';

/**
 * A simple error handling service for logging and messaging.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private notifications: NotificationsService) {
  }

  /**
   * Handles an http error by logging the error for debugging purposes and alerting a message if the error is known.
   * @param  error The error to handle.
   */
  public handleHttpError(error: HttpErrorResponse) {
    console.error(error);
    if (error.error['message'] && error.error['message'] in knownErrors) {
      const errorDescription = knownErrors[error.error['message']];
      this.notifications.error(errorDescription.title, errorDescription.description);
    }
  }

}
