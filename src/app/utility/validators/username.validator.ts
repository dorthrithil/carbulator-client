import {AbstractControl, ValidatorFn} from '@angular/forms';

/**
 * Validator for usernames. Only characters and numbers allowed.
 * @return Validator function for usernames.
 */
export function usernameValidator(): ValidatorFn {
  return (ctrl: AbstractControl): { [key: string]: any } => {
    const regexp = new RegExp(/^[a-zA-Z0-9]*$/);
    return (regexp.test(ctrl.value)) ? null : {'username': true};
  };
}
