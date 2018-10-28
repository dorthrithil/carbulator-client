import {AbstractControl, ValidatorFn} from '@angular/forms';
import {toNumber} from '../conversion/to-number';

/**
 * Validator for end kilometer. Only valid if bigger then last end km.
 * @return Validator function for end km.
 */
export function endKmValidator(lastEndKm: number): ValidatorFn {
  return (ctrl: AbstractControl): { [key: string]: any } => {
    return Number(toNumber(ctrl.value) > lastEndKm) ? null : {'endKm': true};
  };
}
