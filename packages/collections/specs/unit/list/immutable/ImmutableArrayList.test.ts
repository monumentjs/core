import { Sequence } from '../../../../src/base/Sequence';
import { ImmutableArrayList } from '../../../../src/list/immutable/ImmutableArrayList';
import { testImmutableList } from './ImmutableList.spec';

describe('ImmutableArrayList', function() {
  function create<T>(items?: Sequence<T>): ImmutableArrayList<T> {
    return new ImmutableArrayList(items);
  }

  testImmutableList(create);
});
