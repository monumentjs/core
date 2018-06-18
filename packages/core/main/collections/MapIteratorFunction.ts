

export type MapIteratorFunction<TKey, TValue, TResult = void> = (value: TValue, key: TKey) => TResult;
