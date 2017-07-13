import { Constructor } from '../types';
import { IEnumerable } from '../Collections/IEnumerable';
export declare class ArgumentAssertion {
    private _argumentName;
    private _argumentValue;
    constructor(argumentName: string, argumentValue: any);
    notNull(): this;
    type(argumentClass: Constructor<any>): this;
    bounds(min: number, max: number): this;
    indexBounds(min: number, max: number): this;
    isLength(): this;
    isIndexOf(sequence: IEnumerable<any>): this;
    isIndex(): this;
}
