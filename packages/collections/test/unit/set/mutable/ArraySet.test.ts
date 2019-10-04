import { ArraySet, Sequence } from '../../../..';
import { Func2 } from '@monument/core';
import { testSet } from './Set.spec';

describe('ArraySet', function() {
  function create<T>(items?: Sequence<T>, comparator?: Func2<T, T, boolean>): ArraySet<T> {
    return new ArraySet(items, comparator);
  }

  testSet(create);
});
