import { Delegate, ToJSON } from '@monument/core';
import { Equatable, StrictEquals } from '@monument/comparison';
import { InvalidOperationException } from '@monument/exceptions';

export class Optional<T> implements Equatable<Optional<T>>, ToJSON<T> {
  static empty<T>(): Optional<T> {
    return new Optional<T>(undefined as any, false);
  }

  static of<T>(value: T): Optional<T> {
    return new Optional<T>(value, true);
  }

  static ofNullable<T>(value: T | null | undefined): Optional<T> {
    return new Optional<T>(value as T, value != null);
  }

  private readonly value: T;

  readonly isPresent: boolean;

  protected constructor(value: T, isPresent: boolean) {
    this.value = value;
    this.isPresent = isPresent;
  }

  get(): T | never {
    if (!this.isPresent) {
      throw new InvalidOperationException('Value of this Optional is not present');
    }

    return this.value;
  }

  ifPresent(consume: Delegate<[T], void>): void {
    if (this.isPresent) {
      consume(this.value);
    }
  }

  orElse(fallback: T): T {
    return this.isPresent ? this.value : fallback;
  }

  orElseGet(fallback: Delegate<[], T>): T {
    return this.isPresent ? this.value : fallback();
  }

  orElseThrow(getError: Delegate<[], Error>): T | never {
    if (this.isPresent) {
      return this.value;
    } else {
      throw getError();
    }
  }

  /**
   * If a value is present, apply the provided mapping function to it,
   * and if the result is non-null, return an Optional describing the result.
   * Otherwise return an empty Optional.
   * @param project Function which map value to result.
   * @since 0.16.0
   * @author Alex Chugaev
   */
  map<R>(project: Delegate<[T], R>): Optional<R> {
    if (this.isPresent) {
      return Optional.of(project(this.value));
    } else {
      return Optional.empty();
    }
  }

  /**
   * If a value is present, and the value matches the given predicate, return an Optional describing the value,
   * otherwise return an empty Optional.
   * @param predicate
   * @since 0.16.0
   * @author Alex Chugaev
   */
  filter(predicate: Delegate<[T], boolean>): Optional<T> {
    if (this.isPresent && predicate(this.value)) {
      return this;
    } else {
      return Optional.empty();
    }
  }

  /**
   * If a value is present, apply the provided Optional-bearing mapping function to it, return that result,
   * otherwise return an empty Optional.
   * This method is similar to map(Function), but the provided mapper is one whose result is already an Optional,
   * and if invoked, flatMap does not wrap it with an additional Optional.
   * @param project
   * @since 0.16.0
   * @author Alex Chugaev
   */
  flatMap<R>(project: Delegate<[T], Optional<R>>): Optional<R> {
    if (!this.isPresent) {
      return Optional.empty();
    } else {
      return project(this.value);
    }
  }

  equals(other: Optional<T>): boolean;
  equals(other: Optional<T>, equals: Delegate<[T, T], boolean>): boolean;
  equals(other: Optional<T>, equals: Delegate<[T, T], boolean> = StrictEquals): boolean {
    if (this === other) {
      return true;
    }

    if (this.isPresent === other.isPresent) {
      return equals(this.value, other.value);
    } else {
      return true;
    }
  }

  toJSON(): T {
    return this.value;
  }
}
