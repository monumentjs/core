import { InvalidOperationException } from '@monument/exceptions';
import { any } from '../../../src/operators/any';

describe('any()', function() {
  it('should return `true` when all elements match predicate', function() {
    const source = ['one', 'two', 'three'];
    const result = any(source, word => word.length >= 3);

    expect(result).toBe(true);
  });

  it('should return `true` when some of elements does not match predicate', function() {
    const source = ['one', 'two', 'three'];
    const result = any(source, word => word.length < 5);

    expect(result).toBe(true);
  });

  it('should return `false` when all elements does not match predicate', function() {
    const source = ['one', 'two', 'three'];
    const result = any(source, word => word.length > 5);

    expect(result).toBe(false);
  });

  it('should throw if source is empty', function() {
    const source: Array<string> = [];

    expect(() => {
      any(source, () => true);
    }).toThrow(InvalidOperationException);
  });
});
