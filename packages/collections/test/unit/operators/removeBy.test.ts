import { removeBy } from '../../../src/operators/removeBy';

describe('removeBy()', function() {
  it('should remove items matching predicate and maintain on-demand evaluation', function() {
    const source = ['one', 'two', 'three'];
    const result = removeBy(source, s => s.length > 3);

    expect([...result]).toEqual(['one', 'two']);

    source.push('four', 'five', 'six');

    expect([...result]).toEqual(['one', 'two', 'six']);
  });
});
