import {ChangeDetectorRef, OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import * as moment from 'moment';
import {Observable, timer} from 'rxjs';
import {map, startWith, takeWhile} from 'rxjs/operators';

/**
 * Converts a date object to a string that's showing the amount of days between the current date and the passed date.
 */
@Pipe({
  name: 'daysRemaining',
  pure: false
})
export class DaysRemainingPipe implements PipeTransform, OnDestroy {

  private async: AsyncPipe;

  private isDestroyed = false;
  private value: moment.Moment;
  private timer: Observable<string>;

  private includeIn = false;

  constructor(ref: ChangeDetectorRef) {
    this.async = new AsyncPipe(ref);
  }

  /**
   * Transforms the given date to the wanted string.
   * @param obj The moment object to convert.
   * @param includeIn Add "In" infront of transformed values, as in "In 4 Tagen".
   * @returns Transformed string.
   */
  public transform(obj: any, includeIn = false): any {
    if (obj === null) {
      return '';
    }

    if (!moment.isMoment(obj)) {
      throw new Error('DaysRemainingPipe works only with moments');
    }

    this.value = obj.startOf('day');
    this.includeIn = includeIn;

    if (!this.timer) {
      this.timer = this.getObservable();
    }

    return this.async.transform(this.timer);
  }

  /**
   * Set's the destroyed state to true which will automatically stop the observable subscription.
   */
  public ngOnDestroy() {
    this.isDestroyed = true;
  }

  /**
   * Get's a timer observable that emits every full day and one time immediately.
   * @returns TimerObservable.
   */
  private getObservable() {
    const initialDelay = this.value.diff(moment()) % 1000 * 60 * 60 * 24;
    return timer(initialDelay, 60000).pipe(
      startWith(0),
      takeWhile(_ => !this.isDestroyed),
      map((x, i) => this.remaining())
    );
  }

  /**
   * Returns the formatted string.
   * @returns Days remaining string.
   */
  private remaining(): string {
    const now = moment().startOf('day');
    const remaining = this.value.diff(now, 'days');
    const includeIn = this.includeIn ? 'In ' : '';
    if (remaining === 0) {
      return 'Heute';
    }
    if (remaining === 1) {
      return `${includeIn}1 Tag`;
    } else {
      return `${includeIn}${remaining} Tagen`;
    }
  }
}

