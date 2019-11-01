import { ArraySet, Sequence } from '../../../..';
import { Delegate } from '@monument/core';
import { testSet } from './Set.spec';

describe('ArraySet', function() {
  function create<T>(items?: Sequence<T>, comparator?: Delegate<[T, T], boolean>): ArraySet<T> {
    return new ArraySet(items, comparator);
  }

  testSet(create);
});
