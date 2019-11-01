import { InvalidOperationException } from '@monument/exceptions';
import { min } from '../../../src/operators/min';

describe('min()', function() {
  it('should find min value', function() {
    const source = ['one', 'two', 'three', 'four'];

    expect(min(source, s => s.length)).toBe(3);
  });

  it('should throw when source is empty', function() {
    const source: Array<string> = [];

    expect(() => min(source, s => s.length)).toThrow(InvalidOperationException);
  });
});
