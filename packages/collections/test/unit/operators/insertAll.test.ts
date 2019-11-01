import { InvalidArgumentException } from '@monument/assert';
import { insertAll } from '../../../src/operators/insertAll';

describe('insertAll()', function() {
  it('should insert all items at specified position', function() {
    expect([...insertAll([], 0, ['hello'])]).toEqual(['hello']);
    expect([...insertAll(['world'], 0, ['hello'])]).toEqual(['hello', 'world']);
    expect([...insertAll(['hello'], 1, ['world', '!'])]).toEqual(['hello', 'world', '!']);
    expect([...insertAll(['hello', 'world'], 1, [' '])]).toEqual(['hello', ' ', 'world']);
    expect([...insertAll(['hello', 'world'], 2, ['!'])]).toEqual(['hello', 'world', '!']);
  });

  it('should throw when position is out of bounds during lazy evaluation', function() {
    expect(() => [...insertAll([], 0, ['hello', 'world'])]).not.toThrow();
    expect(() => [...insertAll([], 1, ['world'])]).toThrow(InvalidArgumentException);
    expect(() => [...insertAll(['hello', 'world'], 3, ['!'])]).toThrow(InvalidArgumentException);
  });
});
