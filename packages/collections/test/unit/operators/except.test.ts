import { except } from '../../../src/operators/except';

describe('except()', function() {
  it('should produce the set difference of two sequences', function() {
    const source = [1, 2, 3, 4, 3, 2, 1];
    const exclude = [1, 3, 5];
    const result = except(source, exclude);

    expect([...result]).toEqual([2, 4]);
  });

  it('should maintain on-demand evaluation evaluation', function() {
    const source = [1];
    const exclude = [2];
    const result = except(source, exclude);

    expect([...result]).toEqual([1]);

    source.push(2, 3);

    expect([...result]).toEqual([1, 3]);

    source.push(4, 5);

    expect([...result]).toEqual([1, 3, 4, 5]);

    exclude.push(1, 5, 6);

    expect([...result]).toEqual([3, 4]);
  });
});
