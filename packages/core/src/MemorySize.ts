/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @immutable
 */
export class MemorySize {
  static readonly KILOBYTE = 1024;
  static readonly MEGABYTE = 1024 ** 2;
  static readonly GIGABYTE = 1024 ** 3;
  static readonly TERABYTE = 1024 ** 4;
  static readonly PETABYTE = 1024 ** 5;
  static readonly EXABYTE = 1024 ** 6;
  static readonly ZETTABYTE = 1024 ** 7;
  static readonly YOTTABYTE = 1024 ** 8;

  private readonly _length: number;

  get bytes(): number {
    return this._length;
  }

  get exabytes(): number {
    return this._length / MemorySize.EXABYTE;
  }

  get gigabytes(): number {
    return this._length / MemorySize.GIGABYTE;
  }

  get kilobytes(): number {
    return this._length / MemorySize.KILOBYTE;
  }

  get megabytes(): number {
    return this._length / MemorySize.MEGABYTE;
  }

  get petabytes(): number {
    return this._length / MemorySize.PETABYTE;
  }

  get terabytes(): number {
    return this._length / MemorySize.TERABYTE;
  }

  get yottabytes(): number {
    return this._length / MemorySize.YOTTABYTE;
  }

  get zettabytes(): number {
    return this._length / MemorySize.ZETTABYTE;
  }

  constructor(length: number) {
    this._length = length;
  }
}
