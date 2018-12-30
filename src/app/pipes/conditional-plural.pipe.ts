import {Pipe, PipeTransform} from '@angular/core';

/**
 * S pipe for transforming string to plural form.
 */
@Pipe({
  name: 'conditionalPlural'
})
export class ConditionalPluralPipe implements PipeTransform {

  /**
   * Transforms the given value to plural form using the plural addition if the condition is true.
   * @param value Value to pluralize.
   * @param pluralAddition Plural addition (e.g. e or s)
   * @param condition Value will be pluralized if true.
   */
  transform(value: any, pluralAddition: string, condition: boolean): any {
    return condition ? `${value}${pluralAddition}` : value;
  }

}
