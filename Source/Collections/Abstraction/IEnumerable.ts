import {IReadOnlyIndexAccess} from './IReadOnlyIndexAccess';


export interface IEnumerable<T> extends IReadOnlyIndexAccess<T>, Iterable<T> {
    readonly length: number;
}
