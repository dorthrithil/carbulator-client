import {AbstractControl, ValidatorFn} from '@angular/forms';
import {stringToNumber} from '../conversion/string-to-number';

/**
 * Validator for start kilometer. Only valid if bigger then last end km.
 * @return Validator function for start km.
 */
export function startKmValidator(lastEndKm: number): ValidatorFn {
  return (ctrl: AbstractControl): { [key: string]: any } => {
    return Number(stringToNumber(ctrl.value) >= lastEndKm) ? null : {'startKm': true};
  };
}
