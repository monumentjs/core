import { testList } from './List.spec';
import { ArrayList} from '../../../../src/list/mutable/ArrayList';
import { Sequence } from '../../../../src/base/Sequence';

describe('ArrayList', function() {
  function create<T>(items?: Sequence<T>): ArrayList<T> {
    return new ArrayList(items);
  }

  testList(create);
});
