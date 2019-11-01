import { MutableArrayList, Sequence } from '../../../..';
import { testList } from './List.spec';

describe('ArrayList', function() {
  function create<T>(items?: Sequence<T>): MutableArrayList<T> {
    return new MutableArrayList(items);
  }

  testList(create);
});
