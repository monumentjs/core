import { IgnoreCaseEquals } from '@monument/comparison';
import { intersect } from '../../../src/operators/intersect';

describe('intersect()', function() {
  it('should produce the set intersection using default equality comparator', function() {
    expect([...intersect(['one', 'One', 'ONE'], ['one', 'two', 'three'])]).toEqual(['one']);
  });

  it('should produce the set intersection using custom equality comparator', function() {
    expect([...intersect(['one', 'One', 'ONE'], ['one', 'two', 'three'], IgnoreCaseEquals)]).toEqual(['one', 'One', 'ONE']);
  });

  it('should maintain on-demand evaluation evaluation', function() {
    const self: Array<string> = [];
    const other: Array<string> = [];
    const result = intersect(self, other, IgnoreCaseEquals);

    expect([...result]).toEqual([]);

    self.push('one');

    expect([...result]).toEqual([]);

    other.push('one');

    expect([...result]).toEqual(['one']);

    self.push('One', 'ONE');

    expect([...result]).toEqual(['one', 'One', 'ONE']);

    other.push('OnE', 'oNe');

    expect([...result]).toEqual(['one', 'One', 'ONE']);

  });
});
