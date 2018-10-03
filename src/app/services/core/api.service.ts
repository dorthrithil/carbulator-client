import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

/**
 * Simple container service holding api route definitions.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiPrefix = 'api/';
  private apiHost = environment.apiHost + this.apiPrefix;

  public auth = {
    login: (): string => {
      return `${this.apiHost}login`;
    },
    register: (): string => {
      return `${this.apiHost}register`;
    },
    loginRefresh: (): string => {
      return `${this.apiHost}token/refresh`;
    },
    logoutAccess: (): string => {
      return `${this.apiHost}logout/access`;
    },
    logoutRefresh: (): string => {
      return `${this.apiHost}logout/refresh`;
    },
  };

}
