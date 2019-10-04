import { MemorySize } from '@monument/core';

describe('MemorySize', function() {
  describe('constructor(number)', function() {
    it('should create instance with bytes count', function() {
      const size: MemorySize = new MemorySize(0);

      expect(size.bytes).toBe(0);
      expect(size.kilobytes).toBe(0);
      expect(size.megabytes).toBe(0);
      expect(size.gigabytes).toBe(0);
      expect(size.terabytes).toBe(0);
      expect(size.petabytes).toBe(0);
      expect(size.exabytes).toBe(0);
      expect(size.zettabytes).toBe(0);
      expect(size.yottabytes).toBe(0);
    });

    it('should create instance with bytes count', function() {
      const size: MemorySize = new MemorySize(MemorySize.KILOBYTE);

      expect(size.bytes).toBe(MemorySize.KILOBYTE);
      expect(size.kilobytes).toBe(1);
      expect(size.megabytes).toBeLessThan(1);
      expect(size.gigabytes).toBeLessThan(1);
      expect(size.terabytes).toBeLessThan(1);
      expect(size.petabytes).toBeLessThan(1);
      expect(size.exabytes).toBeLessThan(1);
      expect(size.zettabytes).toBeLessThan(1);
      expect(size.yottabytes).toBeLessThan(1);
    });

    it('should create instance with bytes count', function() {
      const size: MemorySize = new MemorySize(MemorySize.MEGABYTE);

      expect(size.bytes).toBe(MemorySize.MEGABYTE);
      expect(size.kilobytes).toBe(1024);
      expect(size.megabytes).toBe(1);
      expect(size.gigabytes).toBeLessThan(1);
      expect(size.terabytes).toBeLessThan(1);
      expect(size.petabytes).toBeLessThan(1);
      expect(size.exabytes).toBeLessThan(1);
      expect(size.zettabytes).toBeLessThan(1);
      expect(size.yottabytes).toBeLessThan(1);
    });
  });
});
