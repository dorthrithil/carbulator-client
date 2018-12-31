import {AbstractControl, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';

/**
 * Validator for moments. Only valid if the input string can be parsed to a moment via the given formatting pattern.
 * @return Validator function for moments.
 */
export function momentValidator(formattingPattern: string): ValidatorFn {
  return (ctrl: AbstractControl): { [key: string]: any } => {
    return moment(ctrl.value, formattingPattern).isValid() ? null : {'moment': true};
  };
}
