
// PRIMITIVE TYPES


export type Constructor<T> = {
    new(...args: any[]): T;
};


export type Pool<T> = {
    [key: string]: T;
};


// COMMON INTERFACES


export enum ComparisonResult {
    Equals = 0,
    Greater = 1,
    Less = -1
}



export interface IComparable<T> {
    /**
     * Compares 2 values and return:
     * -1 - if current object before other one in the sort order;
     * 0 - if current object has the same place in the sort order as other one;
     * 1 - if current object after other one in the sort order.
     */
    compareTo(other: T): ComparisonResult;
}


export interface IConvertible<TFrom, TTo> {
    /**
     * Converts given value into another type.
     */
    convert(obj: TFrom): TTo;
}


export interface ICloneable<T> {
    /**
     * Creates new object that is a copy of the current instance.
     */
    clone(): T;
}


export interface IDisposable {
    /**
     * Indicates whether or not the instance was disposed.
     */
    readonly isDisposed: boolean;

    /**
     * Releases class resource to free memory.
     */
    dispose(): void;
}


export interface IProgress<T> {
    /**
     * Reports a progress update.
     * @param value
     */
    report(value: T): void;
}


export interface IFormatProvider {
    /**
     * Provides formatting services.
     */
    getFormat<T>(formatType: Constructor<T>): T;
}


export interface ICustomFormatter<T> {
    /**
     * Formats given value to it's string representation using specified format and formatting information.
     * @param format
     * @param value
     * @param [formatProvider]
     */
    format(format: string, value: T, formatProvider?: IFormatProvider): string;
}


export interface IParserProvider {
    /**
     * Provides parsing services.
     */
    getParser(): object;
}


export interface ICustomParser<T> {
    /**
     * Parses given value to it's string representation using specified format and formatting information.
     * @param value
     * @param [parserProvider]
     */
    parse(value: string, parserProvider?: IParserProvider): T;
}


export interface IFormattable {
    /**
     * Formats the value of the current instance using the specified format.
     * @param format
     * @param [formatProvider]
     */
    toString(format: string, formatProvider?: IFormatProvider): string;
}


export interface IEquatable<T> {
    /**
     * Indicates whether the current object is equal to another object of the same type.
     * @param other
     */
    equals(other: T): boolean;
}


export interface IServiceProvider {
    /**
     * Indicates whether the current object is equal to another object of the same type.
     * @param type
     */
    getService<T>(type: string | Constructor<T>): T;
}


export interface IJSONSerializable<T> {
    /**
     * Returns pure data object that will be serialized to JSON string.
     */
    toJSON(): T;
}

