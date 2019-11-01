import { groupBy } from '../../../src/operators/groupBy';
import { min } from '../../../src/operators/min';
import { max } from '../../../src/operators/max';

describe('groupBy()', function() {
  it('should group items and maintain on-demand evaluation evaluation', function() {
    const source: Array<number> = [];
    const result: Iterable<{ min: number; max: number; numbers: Array<number>; key: number }> = groupBy(
      source,
      n => Math.floor(n),
      n => n,
      (key, numbers) => ({
        key,
        numbers: [...numbers],
        min: min(numbers, n => n),
        max: max(numbers, n => n)
      })
    );

    expect([...result]).toEqual([]);

    source.push(1.1);

    expect([...result]).toEqual([
      {
        key: 1,
        numbers: [1.1],
        min: 1.1,
        max: 1.1
      }
    ]);

    source.push(1.2, 1.4, 2, 2.2, 3.2, 3.1);

    expect([...result]).toEqual([
      {
        key: 1,
        numbers: [1.1, 1.2, 1.4],
        min: 1.1,
        max: 1.4
      },
      {
        key: 2,
        numbers: [2, 2.2],
        min: 2,
        max: 2.2
      },
      {
        key: 3,
        numbers: [3.2, 3.1],
        min: 3.1,
        max: 3.2
      }
    ]);
  });
});
