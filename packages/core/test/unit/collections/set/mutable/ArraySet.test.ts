import {ArraySet, EqualityComparator, Sequence} from '../../../../..';
import {testSet} from './Set.spec';

describe('ArraySet', function () {
    function create<T>(items?: Sequence<T>, comparator?: EqualityComparator<T>): ArraySet<T> {
        return new ArraySet(items, comparator);
    }

    testSet(create);
});
