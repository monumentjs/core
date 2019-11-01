import { InvalidOperationException } from '@monument/exceptions';
import { sum } from '../../../src/operators/sum';

describe('sum()', function() {
  it('should calculate sum', function() {
    const source = [
      {
        price: 10
      },
      {
        price: 2
      }
    ];
    expect(sum(source, p => p.price)).toBe(12);
  });

  it('should throw when source is empty', function() {
    expect(() => sum([], s => s)).toThrow(InvalidOperationException);
    expect(() => sum([1], s => s)).not.toThrow(InvalidOperationException);
  });
});
