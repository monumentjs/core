import {ImmutableLinkedList, Sequence} from '../../../../..';
import {testImmutableList} from './ImmutableList.spec';

describe('ImmutableLinkedList', function () {
    function create<T>(items?: Sequence<T>): ImmutableLinkedList<T> {
        return new ImmutableLinkedList(items);
    }

    testImmutableList(create);
});
