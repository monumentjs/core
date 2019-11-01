import { reverse } from '../../../src/operators/reverse';

describe('reverse()', function() {
  it('should reverse order of source items and maintain on-demand evaluation', function() {
    const source: Array<number> = [];
    const result = reverse(source);

    expect([...result]).toEqual([]);

    source.push(1, 2, 3);

    expect([...result]).toEqual([3, 2, 1]);

    source.push(4, 5, 6);

    expect([...result]).toEqual([6, 5, 4, 3, 2, 1]);
  });
});
