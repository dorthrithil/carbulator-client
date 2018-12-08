import {CommaSeparatedObjectPropertyPipe} from './comma-separated-object-property.pipe';

describe('CommaSeparatedObjectPropertyPipe', () => {
  it('create an instance', () => {
    const pipe = new CommaSeparatedObjectPropertyPipe();
    expect(pipe).toBeTruthy();
  });
});
