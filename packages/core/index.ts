// Export public API

export * from './src/base/MemorySize';

export * from './src/function/identity';
export * from './src/function/isEven';
export * from './src/function/isFalsy';
export * from './src/function/isOdd';
export * from './src/function/noop';
export * from './src/function/sleep';
export * from './src/function/times';
export * from './src/function/typeOf';

export * from './src/comparison/order/ComparableCompare';
export * from './src/comparison/order/MultiValueCompare';
export * from './src/comparison/order/NumberCompare';

export * from './src/comparison/order/PriorityCompare';

export * from './src/comparison/order/IgnoreCaseCompare';
export * from './src/comparison/order/PreserveCaseCompare';

export * from './src/comparison/equality/DeepEquals';

export * from './src/comparison/equality/EquatableComparator';
export * from './src/comparison/equality/IgnoreCaseEquals';
export * from './src/comparison/equality/PreserveCaseEquals';
export * from './src/comparison/equality/MultiValueEquals';
export * from './src/comparison/equality/StrictEquals';

export * from './src/random/RandomInt';
export * from './src/random/RandomFloat';

// backward compatibility layer
export { argument } from '@monument/assert';
export * from '@monument/collections';
export * from '@monument/exceptions';
export * from '@monument/text';
export {
  Builder,
  Cloneable,
  Comparable,
  CompareFunction,
  ComparisonResult,
  Disposable,
  EqualsFunction,
  Equatable,
  Ordered,
  Priority,
  SortOrder,
  Supplier,
  RandomValue,
  SupplyFunction,
  ToJSON,
  ToString,
  Type,
  TypeOfResult
} from '@monument/contracts';
