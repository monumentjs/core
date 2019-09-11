import { InvalidArgumentException } from '@monument/exceptions';
import { argument } from '../../..';

describe('argument()', function() {
  it('should throw InvalidArgumentException if expression resolved to false', function() {
    expect(() => argument(false)).toThrow(InvalidArgumentException);
    expect(() => argument(true)).not.toThrow(InvalidArgumentException);
  });

  it('should throw InvalidArgumentException with custom error message specified as string', function() {
    expect(() => argument(false, 'Custom error message')).toThrow(InvalidArgumentException);
    expect(() => argument(false, 'Custom error message')).toThrow('Custom error message');
    expect(() => argument(true, 'Custom error message')).not.toThrow(InvalidArgumentException);
  });

  it('should throw InvalidArgumentException with custom error message specified as supplier', function() {
    expect(() => argument(false, () => 'Custom error message')).toThrow(InvalidArgumentException);
    expect(() => argument(false, () => 'Custom error message')).toThrow('Custom error message');
    expect(() => argument(true, () => 'Custom error message')).not.toThrow(InvalidArgumentException);
  });
});
