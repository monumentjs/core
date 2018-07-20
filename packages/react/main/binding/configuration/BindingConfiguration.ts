import {EqualityComparator} from '@monument/core/main/EqualityComparator';


export interface BindingConfiguration<T> {
    readonly comparator?: EqualityComparator<T>;
}
