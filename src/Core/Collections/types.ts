import {IEnumerable} from './IEnumerable';


export type IteratorFunction<TItem, TResult> = (actualItem: TItem, index: number, list: IEnumerable<TItem>) => TResult;
export type CombineFunction<A, B, TResult> = (a: A, b: B) => TResult;
