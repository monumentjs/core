import { InvalidArgumentException } from '@monument/assert';
import { insert } from '../../../src/operators/insert';

describe('insert()', function() {
  it('should insert item at specified position', function() {
    expect([...insert([], 0, 'hello')]).toEqual(['hello']);
    expect([...insert(['world'], 0, 'hello')]).toEqual(['hello', 'world']);
    expect([...insert(['hello'], 1, 'world')]).toEqual(['hello', 'world']);
    expect([...insert(['hello', 'world'], 1, ' ')]).toEqual(['hello', ' ', 'world']);
    expect([...insert(['hello', 'world'], 2, '!')]).toEqual(['hello', 'world', '!']);
  });

  it('should throw when position is out of bounds during lazy evaluation', function() {
    expect(() => [...insert([], 0, 'hello')]).not.toThrow();
    expect(() => [...insert([], 1, 'world')]).toThrow(InvalidArgumentException);
    expect(() => [...insert(['hello', 'world'], 3, '!')]).toThrow(InvalidArgumentException);
  });
});
