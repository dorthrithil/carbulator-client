import {AbstractControl, ValidatorFn} from '@angular/forms';

/**
 * Validator for numbers with comma as decimal separator and max two decimals.
 * @return Validator function for numbers.
 */
export function numberValidator(): ValidatorFn {
  return (ctrl: AbstractControl): { [key: string]: any } => {
    if (ctrl.value === null || ctrl.value === '') {
      return null;
    }
    const regexp = new RegExp(/^[0-9]*(,|.)?[0-9]{1,2}$/);
    return (regexp.test(ctrl.value)) ? null : {'number': true};
  };
}
