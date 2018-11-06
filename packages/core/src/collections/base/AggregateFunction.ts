
/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export type AggregateFunction<T, TAggregate> = (lastSeed: TAggregate, item: T, index: number) => TAggregate;
