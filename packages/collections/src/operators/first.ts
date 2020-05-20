import { Optional } from '../../../data';

export function first<T>(self: Iterable<T>): Optional<T> {
  const result: IteratorResult<T> = self[Symbol.iterator]().next();

  if (result.done) {
    return Optional.empty();
  } else {
    return Optional.of(result.value);
  }
}
