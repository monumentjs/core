import { takeWhile } from '../../../src/operators/takeWhile';

describe('takeWhile()', function() {
  it('should take items while predicate returns true', function() {
    const source: Array<string> = [];
    const result = takeWhile(source, s => s.length === 3);

    expect([...result]).toEqual([]);

    source.push('one', 'two');

    expect([...result]).toEqual(['one', 'two']);

    source.push('three', 'four', 'five', 'six');

    expect([...result]).toEqual(['one', 'two']);
  });
});
