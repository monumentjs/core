import { InvalidArgumentException } from '@monument/assert';
import { chunk } from '../../../src/operators/chunk';

describe('chunk()', function() {
  it('should split source into chunks of default size (1)', function() {
    const source = [1, 2, 3];
    const result = [...chunk(source)];
    const chunk1 = [...result[0]];
    const chunk2 = [...result[1]];
    const chunk3 = [...result[2]];

    expect(chunk1).toEqual([1]);
    expect(chunk2).toEqual([2]);
    expect(chunk3).toEqual([3]);
  });

  it('should split source into chunks of specified size', function() {
    const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const result = chunk(source, 3);

    expect([...[...result][0]]).toEqual([1, 2, 3]);
    expect([...[...result][1]]).toEqual([4, 5, 6]);
    expect([...[...result][2]]).toEqual([7, 8, 9]);
    expect([...[...result][3]]).toEqual([0]);
  });

  it('should throw when chunk size less than 1', function() {
    expect(() => {
      chunk([1, 2, 3], 0);
    }).toThrow(InvalidArgumentException);
  });

  it('should maintain on-demand evaluation evaluation', function() {
    const source: Array<number> = [];
    const result = chunk(source, 2);

    expect([...result]).toEqual([]);

    source.push(1);

    expect([...[...result][0]]).toEqual([1]);

    source.push(2);

    expect([...[...result][0]]).toEqual([1, 2]);

    source.push(3);

    expect([...[...result][0]]).toEqual([1, 2]);
    expect([...[...result][1]]).toEqual([3]);
  });
});
