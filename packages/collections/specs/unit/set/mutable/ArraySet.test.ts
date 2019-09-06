import { EqualsFunction } from '@monument/core';
import { ArraySet } from '../../../../src/set/mutable/ArraySet';
import { Sequence } from '../../../../src/base/Sequence';
import { testSet } from './Set.spec';

describe('ArraySet', function() {
  function create<T>(items?: Sequence<T>, comparator?: EqualsFunction<T>): ArraySet<T> {
    return new ArraySet(items, comparator);
  }

  testSet(create);
});
