import { ComparisonResult } from './ComparisonResult';

export type CompareFunction<T> = (current: T, other: T) => ComparisonResult;
