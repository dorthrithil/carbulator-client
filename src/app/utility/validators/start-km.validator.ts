import {AbstractControl, ValidatorFn} from '@angular/forms';
import {toNumber} from '../conversion/to-number';

/**
 * Validator for start kilometer. Only valid if equal or higher then last end km.
 * @return Validator function for start km.
 */
export function startKmValidator(lastEndKm: number): ValidatorFn {
  return (ctrl: AbstractControl): { [key: string]: any } => {
    return Number(toNumber(ctrl.value) >= lastEndKm) ? null : {'startKm': true};
  };
}
