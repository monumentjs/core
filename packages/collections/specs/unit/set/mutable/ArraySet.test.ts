import { EqualsFunction } from '@monument/core';
import { ArraySet } from '../../../../index';
import { Sequence } from '@monument/contracts';
import { testSet } from './Set.spec';

describe('ArraySet', function() {
  function create<T>(items?: Sequence<T>, comparator?: EqualsFunction<T>): ArraySet<T> {
    return new ArraySet(items, comparator);
  }

  testSet(create);
});
