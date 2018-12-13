import {Injectable} from '@angular/core';
import * as MobileDetect from 'mobile-detect';

/**
 * Service that provides a function to check if the current user is on mobile.
 */
@Injectable({
  providedIn: 'root'
})
export class MobileDetectionService {


  /**
   * Checks if the screen height is probably on a mobile device.
   */
  public isMobile(): boolean {
    const md = new MobileDetect(window.navigator.userAgent);
    return md.isPhoneSized();
  }

}
