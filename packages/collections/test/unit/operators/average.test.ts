import { InvalidOperationException } from '@monument/exceptions';
import { average } from '../../../src/operators/average';

describe('average()', function() {
  it('should calculate average value for single item', function() {
    const source = [{ age: 20 }];
    const result = average(source, a => a.age);

    expect(result).toBe(20);
  });

  it('should calculate average value for multiple items', function() {
    const source = [{ age: 20 }, { age: 24 }, { age: 28 }];
    const result = average(source, a => a.age);

    expect(result).toBe(24);
  });

  it('should throw exception when source is empty', function() {
    expect(() => {
      average([], _ => 0);
    }).toThrow(InvalidOperationException);
  });
});
