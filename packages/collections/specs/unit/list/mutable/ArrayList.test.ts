import { testList } from './List.spec';
import { ArrayList } from '../../../../index';
import { Sequence } from '@monument/contracts';

describe('ArrayList', function() {
  function create<T>(items?: Sequence<T>): ArrayList<T> {
    return new ArrayList(items);
  }

  testList(create);
});
