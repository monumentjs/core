
export type Constructor = {
    new(...args: any[]): any
};


export type AsyncResult<T> = Promise<T>;


export type Pool<T> = {
    [key: string]: T;
};


export interface IComparable<T> {
    /**
     * Compares 2 values and return:
     * -1 - if current object before other one in the sort order;
     * 0 - if current object has the same place in the sort order as other one;
     * 1 - if current object after other one in the sort order.
     */
    compare(other: T): number;
}


export interface IConvertible<I, O> {
    /**
     * Converts given value into another type.
     */
    convert(obj: I): O;
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
    isDisposed: boolean;

    /**
     * Releases class resource to free memory.
     */
    dispose();
}


export interface IProgress<T> {
    /**
     * Reports a progress update.
     * @param value
     */
    report(value: T);
}


export interface IFormatProvider<F> {
    /**
     * Provides formatting services.
     */
    getFormat(): F;
}


export interface ICustomFormatter<T> {
    /**
     * Formats given value to it's string representation using specified format and formatting information.
     * @param value
     * @param [formatProvider]
     */
    format(value: T, formatProvider?: IFormatProvider<any>): string;
}


export interface IParserProvider<P> {
    /**
     * Provides parsing services.
     */
    getParser(): P;
}


export interface ICustomParser<T> {
    /**
     * Parses given value to it's string representation using specified format and formatting information.
     * @param value
     * @param [parserProvider]
     */
    parse(value: string, parserProvider?: IParserProvider<T>): T;
}


export interface IFormattable {
    /**
     * Formats the value of the current instance using the specified format.
     * @param [formatProvider]
     */
    toString(formatProvider?: IFormatProvider<any>): string;
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
    getService(type: string | Constructor): any;
}


export interface IJSONSerializable<T> {
    /**
     * Returns pure data that will be serialized to JSON string.
     */
    toJSON(): T;
}


export interface IFactory<T> {
    /**
     * Creates instances of specified type, encapsulating logic of constructing objects.
     * @param [opts]
     */
    create(...opts: any[]): T;
}



