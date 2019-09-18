import { ImmutableArrayList } from '../../../../index';
import { Sequence } from '@monument/contracts';
import { testImmutableList } from './ImmutableList.spec';

describe('ImmutableArrayList', function() {
  function create<T>(items?: Sequence<T>): ImmutableArrayList<T> {
    return new ImmutableArrayList(items);
  }

  testImmutableList(create);
});
