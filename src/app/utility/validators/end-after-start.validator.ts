import {AbstractControl, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';

/**
 * Validator for calendar event dates. Only valid if the end moment is after the start moment.
 * @param formattingPattern The
 * @return Validator function for calendar events.
 */
export function endAfterStartValidator(formattingPattern: string): ValidatorFn {
  return (ctrl: AbstractControl): { [key: string]: any } => {
    if (!ctrl.parent) { // If the control is not attached to the parent control this would fail
      return null;
    }
    const start = moment(ctrl.parent.get('start').value, formattingPattern);
    return moment(ctrl.value, formattingPattern).isAfter(start) ? null : {'endAfterStart': true};
  };
}
