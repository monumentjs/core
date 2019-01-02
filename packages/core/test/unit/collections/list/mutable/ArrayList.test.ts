import {testList} from './List.spec';
import {ArrayList, Sequence} from '../../../../..';

describe('ArrayList', function () {
    function create<T>(items?: Sequence<T>): ArrayList<T> {
        return new ArrayList(items);
    }

    testList(create);
});
