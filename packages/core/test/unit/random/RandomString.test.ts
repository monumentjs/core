import { RandomString } from '../../..';

describe('RandomString', function() {
  describe('constructor(number)', function() {
    it('should initialize random string with given length', function() {
      const a = new RandomString(10);
      const b = new RandomString(10);

      expect(a.value.length).toBe(10);
      expect(b.value.length).toBe(10);
      expect(a.value).not.toBe(b.value);
      expect(a.toJSON()).toBe(a.value);
      expect(b.toJSON()).toBe(b.value);
      expect(a.toString()).toBe(a.value.toString());
      expect(b.toString()).toBe(b.value.toString());
    });
  });

  describe('constructor()', function() {
    it('should initialize random string with given length and charset', function() {
      const a = new RandomString(10, 'a');
      const b = new RandomString(10, 'b');

      expect(a.value).toBe('aaaaaaaaaa');
      expect(b.value).toBe('bbbbbbbbbb');
      expect(a.value.length).toBe(10);
      expect(b.value.length).toBe(10);
      expect(a.value).not.toBe(b.value);
      expect(a.toJSON()).toBe(a.value);
      expect(b.toJSON()).toBe(b.value);
      expect(a.toString()).toBe(a.value.toString());
      expect(b.toString()).toBe(b.value.toString());
    });
  });
});
