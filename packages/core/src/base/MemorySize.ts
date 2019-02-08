/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @immutable
 */
export class MemorySize {
    public static readonly KILOBYTE = 1024;
    public static readonly MEGABYTE = 1024 ** 2;
    public static readonly GIGABYTE = 1024 ** 3;
    public static readonly TERABYTE = 1024 ** 4;
    public static readonly PETABYTE = 1024 ** 5;
    public static readonly EXABYTE = 1024 ** 6;
    public static readonly ZETTABYTE = 1024 ** 7;
    public static readonly YOTTABYTE = 1024 ** 8;

    private readonly _length: number;

    public get bytes(): number {
        return this._length;
    }

    public get exabytes(): number {
        return this._length / MemorySize.EXABYTE;
    }

    public get gigabytes(): number {
        return this._length / MemorySize.GIGABYTE;
    }

    public get kilobytes(): number {
        return this._length / MemorySize.KILOBYTE;
    }

    public get megabytes(): number {
        return this._length / MemorySize.MEGABYTE;
    }

    public get petabytes(): number {
        return this._length / MemorySize.PETABYTE;
    }

    public get terabytes(): number {
        return this._length / MemorySize.TERABYTE;
    }

    public get yottabytes(): number {
        return this._length / MemorySize.YOTTABYTE;
    }

    public get zettabytes(): number {
        return this._length / MemorySize.ZETTABYTE;
    }

    public constructor(length: number) {
        this._length = length;
    }
}
