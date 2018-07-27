import {EqualityComparator} from '@monument/core/main/utils/comparison/EqualityComparator';


export interface BindingConfiguration<T> {
    readonly comparator?: EqualityComparator<T>;
}
