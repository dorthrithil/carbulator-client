import {AbstractControl, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';

/**
 * Validator for moments that need to be in the future. Only valid if the input string is in the future.
 * If it's not a valid moment, the validator doesn't fail. Use moment validator for this case.
 * @return Validator function for moments.
 */
export function futureMomentValidator(formattingPattern: string | string[]): ValidatorFn {
  return (ctrl: AbstractControl): { [key: string]: any } => {
    const parsedMoment = moment(ctrl.value, formattingPattern);
    if (!parsedMoment.isValid()) {
      return null;
    }
    return parsedMoment.isAfter(moment()) ? null : {'futureMoment': true};
  };
}
