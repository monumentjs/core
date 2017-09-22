import {IIndexAccess} from './IIndexAccess';


export interface IEnumerable<T> extends IIndexAccess<T>, Iterable<T> {
    readonly length: number;
}
