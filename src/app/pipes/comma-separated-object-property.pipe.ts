import {Pipe, PipeTransform} from '@angular/core';

/**
 * Takes an array of objects and returns a comma separated string of properties of the arrays object instances.
 */
@Pipe({
  name: 'commaSeparatedObjectProperty'
})
export class CommaSeparatedObjectPropertyPipe implements PipeTransform {

  /**
   * Transforms an array of object to a comma separated string of properties of the arrays object instances.
   * @param value Array to transform.
   * @param propertyName Property of the array object instances.
   */
  transform(value: any[], propertyName: string): any {
    if (value instanceof Array) {
      return value.map(val => val[propertyName]).join(', ');
    } else {
      throw new Error('Object property must me an array for CommaSeparatedObjectPropertyPipe to work.');
    }
  }

}
