import { findIndex } from '../../../src/operators/findIndex';

describe('findIndex()', function() {
  it('should return index of first item matching predicate', function() {
    expect(findIndex([], n => n === 2)).toBe(undefined);
    expect(findIndex([2], n => n === 2)).toBe(0);
    expect(findIndex([1, 2], n => n === 2)).toBe(1);
  });
});
