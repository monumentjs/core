import { ArrayList, Sequence } from '../../../..';
import { testList } from './List.spec';

describe('ArrayList', function() {
  function create<T>(items?: Sequence<T>): ArrayList<T> {
    return new ArrayList(items);
  }

  testList(create);
});
