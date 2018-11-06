import {testList} from './List.spec';
import {LinkedList, Sequence} from '../../../..';

describe('LinkedList', function () {
    function create<T>(items?: Sequence<T>): LinkedList<T> {
        return new LinkedList(items);
    }

    testList(create);
});
