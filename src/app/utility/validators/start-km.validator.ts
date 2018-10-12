import {AbstractControl, ValidatorFn} from '@angular/forms';

/**
 * Validator for start kilometer. Only valid if bigger then last end km.
 * @return Validator function for start km.
 */
export function startKmValidator(lastEndKm: number): ValidatorFn {
  return (ctrl: AbstractControl): { [key: string]: any } => {
    return Number(ctrl.value >= lastEndKm) ? null : {'startKm': true};
  };
}
