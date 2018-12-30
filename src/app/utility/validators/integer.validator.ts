import {AbstractControl, ValidatorFn} from '@angular/forms';

/**
 * Validator for integers.
 * @return Validator function for integers.
 */
export function integerValidator(): ValidatorFn {
  return (ctrl: AbstractControl): { [key: string]: any } => {
    if (ctrl.value === null || ctrl.value === '') {
      return null;
    }
    const regexp = new RegExp(/^-?[0-9]+$/);
    return (regexp.test(ctrl.value)) ? null : {'integer': true};
  };
}
