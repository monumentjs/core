export declare type Constructor<T> = {
    new (...args: any[]): T;
};
export declare type Pool<T> = {
    [key: string]: T;
};
export declare enum ComparisonResult {
    Equals = 0,
    Greater = 1,
    Less = -1,
}
export interface IComparable<T> {
    compareTo(other: T): ComparisonResult;
}
export interface IConvertible<TFrom, TTo> {
    convert(obj: TFrom): TTo;
}
export interface ICloneable<T> {
    clone(): T;
}
export interface IDisposable {
    readonly isDisposed: boolean;
    dispose(): void;
}
export interface IProgress<T> {
    report(value: T): void;
}
export interface IFormatProvider {
    getFormat<T>(formatType: Constructor<T>): T;
}
export interface ICustomFormatter<T> {
    format(format: string, value: T, formatProvider?: IFormatProvider): string;
}
export interface IParserProvider {
    getParser(): object;
}
export interface ICustomParser<T> {
    parse(value: string, parserProvider?: IParserProvider): T;
}
export interface IFormattable {
    toString(format: string, formatProvider?: IFormatProvider): string;
}
export interface IEquatable<T> {
    equals(other: T): boolean;
}
export interface IServiceProvider {
    getService<T>(type: string | Constructor<T>): T;
}
export interface IJSONSerializable<T> {
    toJSON(): T;
}
