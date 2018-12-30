import {AbstractControl, ValidatorFn} from '@angular/forms';
import {toNumber} from '../conversion/to-number';

/**
 * Min Validator for numbers with decimal separators.
 * @return Validator function for end km.
 */
export function numberMinValidator(min: number): ValidatorFn {
  return (ctrl: AbstractControl): { [key: string]: any } => {
    return Number(toNumber(ctrl.value) >= min) ? null : {'numberMin': true};
  };
}
