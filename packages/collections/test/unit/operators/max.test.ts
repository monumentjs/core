import { InvalidOperationException } from '@monument/exceptions';
import { max } from '../../../src/operators/max';

describe('max()', function() {
  it('should find max value', function() {
    const source = ['one', 'two', 'three', 'four'];

    expect(max(source, s => s.length)).toBe(5);
  });

  it('should throw when source is empty', function() {
    const source: Array<string> = [];

    expect(() => max(source, s => s.length)).toThrow(InvalidOperationException);
  });
});
