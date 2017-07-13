import { IEnumerable } from './IEnumerable';
export declare type IteratorFunction<TItem, TResult> = (actualItem: TItem, index: number, list: IEnumerable<TItem>) => TResult;
export declare type CombineFunction<A, B, TResult> = (a: A, b: B) => TResult;
