import {AbstractControl, ValidatorFn} from '@angular/forms';

/**
 * Validator for latitude longitude separated by a comma and space.
 * @param allowEmpty Allow null or empty string as input
 * @return Validator function for latitude longitude.
 */
export function latlongValidator(allowEmpty = false): ValidatorFn {
  return (ctrl: AbstractControl): { [key: string]: any } => {
    if (allowEmpty && (ctrl.value === null || ctrl.value === '')) {
      return null;
    }
    const regexp = new RegExp(/^(\-?\d+(\.\d+)?), (\-?\d+(\.\d+)?)$/);
    return (regexp.test(ctrl.value)) ? null : {'latlong': true};
  };
}
