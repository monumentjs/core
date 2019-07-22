import { assert, AssertionException } from '../..';
import { of } from 'rxjs';

const CUSTOM_MESSAGE = 'Custom message';

describe('assert()', function() {
  describe('synchronous', function() {
    it('should throw AssertionException if expression is false', function() {
      expect(() => assert(false)).toThrow(AssertionException);
      expect(() => assert(true)).not.toThrow(AssertionException);
    });

    it('should throw AssertionException with custom message', function() {
      expect(() => assert(false, CUSTOM_MESSAGE)).toThrow(AssertionException);
      expect(() => assert(false, CUSTOM_MESSAGE)).toThrow(CUSTOM_MESSAGE);
      expect(() => assert(true, CUSTOM_MESSAGE)).not.toThrow();
    });

    it('should throw AssertionException with custom message supplier', function() {
      expect(() => assert(false, () => CUSTOM_MESSAGE)).toThrow(AssertionException);
      expect(() => assert(false, () => CUSTOM_MESSAGE)).toThrow(CUSTOM_MESSAGE);
      expect(() => assert(true, () => CUSTOM_MESSAGE)).not.toThrow();
    });
  });

  describe('async', function() {
    it('should throw AssertionException if async expression resolves to false', async function() {
      await expect(assert(Promise.resolve(false))).rejects.toThrow(AssertionException);
      await expect(assert(Promise.resolve(true))).resolves.toBe(undefined);
    });

    it('should throw AssertionException with custom message', async function() {
      await expect(assert(Promise.resolve(false), CUSTOM_MESSAGE)).rejects.toThrow(AssertionException);
      await expect(assert(Promise.resolve(false), CUSTOM_MESSAGE)).rejects.toThrow(CUSTOM_MESSAGE);
      await expect(assert(Promise.resolve(true), CUSTOM_MESSAGE)).resolves.toBe(undefined);
    });

    it('should throw AssertionException with custom message', async function() {
      await expect(assert(Promise.resolve(false), () => CUSTOM_MESSAGE)).rejects.toThrow(AssertionException);
      await expect(assert(Promise.resolve(false), () => CUSTOM_MESSAGE)).rejects.toThrow(CUSTOM_MESSAGE);
      await expect(assert(Promise.resolve(true), () => CUSTOM_MESSAGE)).resolves.toBe(undefined);
    });
  });

  describe('observable', function() {
    it('should throw AssertionException if async expression resolves to false', async function() {
      await expect(assert(of(false)).toPromise()).rejects.toThrow(AssertionException);
      await expect(assert(of(true)).toPromise()).resolves.toBe(undefined);
    });

    it('should throw AssertionException with custom message', async function() {
      await expect(assert(of(false), CUSTOM_MESSAGE).toPromise()).rejects.toThrow(AssertionException);
      await expect(assert(of(false), CUSTOM_MESSAGE).toPromise()).rejects.toThrow(CUSTOM_MESSAGE);
      await expect(assert(of(true), CUSTOM_MESSAGE).toPromise()).resolves.toBe(undefined);
    });

    it('should throw AssertionException with custom message supplier', async function() {
      await expect(assert(of(false), () => CUSTOM_MESSAGE).toPromise()).rejects.toThrow(AssertionException);
      await expect(assert(of(false), () => CUSTOM_MESSAGE).toPromise()).rejects.toThrow(CUSTOM_MESSAGE);
      await expect(assert(of(true), () => CUSTOM_MESSAGE).toPromise()).resolves.toBe(undefined);
    });
  });
});
