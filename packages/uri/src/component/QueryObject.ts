import { ToString } from '@monument/core';
import { KeyValuePair, MutableLinkedMultiValueMap } from '@monument/collections';
import { MultiValueEquals, PreserveCaseEquals, StrictEquals } from '@monument/comparison';
import { Printer } from '@monument/text';
import { QueryParameterValueEquals } from '../comparison/QueryParameterValueEquals';
import { Query } from './Query';

/**
 * @since 0.15.0
 * @author Alex Chugaev
 */
export class QueryObject implements Query {
  private readonly entries: MutableLinkedMultiValueMap<string, ToString>;

  get keys(): Iterable<string> {
    return this.entries.keys;
  }

  get length(): number {
    return this.entries.length;
  }

  get present(): boolean {
    return !this.entries.isEmpty;
  }

  constructor();
  constructor(entries: Iterable<KeyValuePair<string, ToString>>);
  constructor(entries: Iterable<KeyValuePair<string, ToString>> = []) {
    this.entries = new MutableLinkedMultiValueMap<string, ToString>(entries, PreserveCaseEquals, QueryParameterValueEquals);
  }

  [Symbol.iterator](): Iterator<KeyValuePair<string, ToString>> {
    return this.entries[Symbol.iterator]();
  }

  toArray(): Array<KeyValuePair<string, ToString>> {
    return this.entries.toArray();
  }

  equals(other: Query): boolean {
    return this.entries.equals(other);
  }

  contains(name: string): boolean {
    return this.entries.containsKey(name);
  }

  containsIf(name: string, value: ToString): boolean {
    return this.entries.containsEntry(name, value);
  }

  get(name: string): ToString | undefined {
    return this.entries.getFirst(name);
  }

  getAll(key: string): Iterable<ToString> {
    return this.entries.get(key);
  }

  toJSON(): Array<KeyValuePair<string, ToString>> {
    return this.entries.toArray();
  }

  toString(): string {
    let first = true;

    for (const [name, value] of this.entries) {
      if (!first) {
        out.append('&');
      }

      out.append(encodeURIComponent(name));
      out.append('=');
      out.append(encodeURIComponent(value.toString()));

      first = false;
    }
  }

  print(printer: Printer<ToString>): void {
  }

  with(name: string, value: ToString): Query {
    return new QueryObject([
      ...this,
      [name, value]
    ]);
  }

  withAll(entries: Iterable<KeyValuePair<string, ToString>>): Query {
    return new QueryObject([
      ...this,
      ...entries
    ]);
  }

  without(name: string): Query {
    return new QueryObject(this.entries.filter(_name => {
      return !MultiValueEquals([
        [name, _name, PreserveCaseEquals]
      ]);
    }));
  }

  withoutIf(name: string, value: ToString): Query {
    return new QueryObject(this.entries.filter((_name, _value) => {
      return !MultiValueEquals([
        [name, _name, PreserveCaseEquals],
        [value, _value, StrictEquals]
      ]);
    }
  }

  replaceAll(name: string, value: ToString): Query {
    const copy = this.entries.clone();
  }
}
