import { ArrayQueue } from '../../../../index';
import { testQueue } from './Queue.spec';

describe('ArrayQueue', function() {
  function create<I>(items: Iterable<I> = []): ArrayQueue<I> {
    return new ArrayQueue(items);
  }

  testQueue(create);
});
