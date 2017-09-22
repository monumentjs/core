import {IEnumerable} from './Abstraction/IEnumerable';


export type IteratorFunction<TItem, TResult> = (actualItem: TItem, index: number, list: IEnumerable<TItem>) => TResult;
