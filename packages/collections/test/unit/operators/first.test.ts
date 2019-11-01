import { first } from '../../../src/operators/first';

describe('first()', function() {
  it('should return first item matching predicate or `undefined`', function() {
    const source = [1, 2, 3];

    expect(first(source, n => n > 0)).toBe(1);
    expect(first(source, n => n > 1)).toBe(2);
    expect(first(source, n => n > 2)).toBe(3);
    expect(first(source, n => n > 3)).toBe(undefined);
  });
});
