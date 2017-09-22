import {IEnumerable} from './IEnumerable';
import {IReadOnlyCollection} from './IReadOnlyCollection';
import {IteratorFunction} from '../IteratorFunction';
import {IEqualityComparator} from '../../Core/Abstraction/IEqualityComparator';
import {ICloneable} from '../../Core/Abstraction/ICloneable';
import {IEquatable} from '../../Core/Abstraction/IEquatable';


export interface ICollection<T> extends IReadOnlyCollection<T>, ICloneable<ICollection<T>>, IEquatable<IEnumerable<T>> {
    add(item: T, comparator?: IEqualityComparator<T>): boolean;
    addAll(items: IEnumerable<T>, comparator?: IEqualityComparator<T>): boolean;
    remove(item: T, comparator?: IEqualityComparator<T>): boolean;
    removeAll(items: IEnumerable<T>, comparator?: IEqualityComparator<T>): boolean;
    removeBy(predicate: IteratorFunction<T, boolean>): boolean;
    retainAll(items: IEnumerable<T>, comparator?: IEqualityComparator<T>): boolean;
    clear(): boolean;
}

