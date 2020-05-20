import { first } from '../../../src/operators/first';
import { Optional } from '@monument/data';

describe('first()', function() {
  it('should return first item matching predicate or `undefined`', function() {
    const source = [1, 2, 3];

    expect(first(source)).toBeInstanceOf(Optional);
    expect(first(source).equals(Optional.of(1))).toBe(true);
    expect(first([]).equals(Optional.empty())).toBe(true);
  });
});
