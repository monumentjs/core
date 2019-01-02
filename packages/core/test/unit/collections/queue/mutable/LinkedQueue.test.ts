import {LinkedQueue, Sequence} from '../../../../..';
import {testQueue} from './Queue.spec';

describe('LinkedQueue', function () {
    function create<I>(items?: Sequence<I>): LinkedQueue<I> {
        return new LinkedQueue(items);
    }

    testQueue(create);
});
