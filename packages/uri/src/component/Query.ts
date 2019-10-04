import { Func, Func2, Func3, ToString } from '@monument/core';
import { KeyValuePair, LinkedMultiValueMap, MultiValueMap, ReadOnlyMap, ReadOnlyMultiValueMap } from '@monument/collections';
import { MultiValueEquals, PreserveCaseEquals, StrictEquals } from '@monument/comparison';
import { BooleanParser, FloatParser, IntParser } from '@monument/text';
import { QueryParameterValueEquals } from '../comparison';
import { Component } from './Component';

/**
 * @since 0.15.0
 * @author Alex Chugaev
 * @final
 * @readonly
 */
export class Query implements Component<Iterable<KeyValuePair<string, ToString>>>, ReadOnlyMultiValueMap<string, ToString> {
  get keys(): Iterable<string> {
    return this.params.keys;
  }

  get values(): Iterable<ToString> {
    return this.params.values;
  }

  get valuesCount(): number {
    return this.params.valuesCount;
  }

  get length(): number {
    return this.params.length;
  }

  get isEmpty(): boolean {
    return this.params.isEmpty;
  }

  get isDefined(): boolean {
    return !this.isEmpty;
  }

  get value(): Iterable<KeyValuePair<string, ToString>> {
    return this;
  }

  private readonly params: MultiValueMap<string, ToString>;

  constructor();
  constructor(entries: Iterable<KeyValuePair<string, ToString>>);
  constructor(entries: Iterable<KeyValuePair<string, ToString>> = []) {
    this.params = new LinkedMultiValueMap<string, ToString>(entries, PreserveCaseEquals, QueryParameterValueEquals);
  }

  [Symbol.iterator](): Iterator<[string, ToString]> {
    return this.params[Symbol.iterator]();
  }

  toArray(): Array<KeyValuePair<string, ToString>> {
    return this.params.toArray();
  }

  equals(other: ReadOnlyMultiValueMap<string, ToString>): boolean {
    return this.params.equals(other);
  }

  containsEntries(entries: Iterable<KeyValuePair<string, ToString>>): boolean {
    return this.params.containsEntries(entries);
  }

  containsEntry(key: string, value: ToString): boolean {
    return this.params.containsEntry(key, value);
  }

  containsKey(key: string): boolean {
    return this.params.containsKey(key);
  }

  containsKeys(keys: Iterable<string>): boolean {
    return this.params.containsKeys(keys);
  }

  containsValue(value: ToString): boolean {
    return this.params.containsValue(value);
  }

  containsValues(values: Iterable<ToString>): boolean {
    return this.params.containsValues(values);
  }

  filter(predicate: Func3<string, ToString, number, boolean>): ReadOnlyMultiValueMap<string, ToString> {
    return this.params.filter(predicate);
  }

  get(key: string): Iterable<ToString> {
    return this.params.get(key);
  }

  getFirst(key: string): ToString | undefined;
  getFirst(key: string, fallback: Func<ToString>): ToString;
  getFirst(key: string, fallback?: Func<ToString>): ToString | undefined {
    return this.params.getFirst(key, fallback as any);
  }

  keyOf(value: ToString): string | undefined {
    return this.params.keyOf(value);
  }

  keysOf(value: ToString): Iterable<string> {
    return this.params.keysOf(value);
  }

  map<K, V>(
    project: Func3<string, ToString, number, KeyValuePair<K, V>>,
    compareKeys?: Func2<K, K, boolean>,
    compareValues?: Func2<V, V, boolean>
  ): ReadOnlyMultiValueMap<K, V> {
    return this.params.map(project, compareKeys, compareValues);
  }

  toSingleValueMap(): ReadOnlyMap<string, ToString> {
    return this.params.toSingleValueMap();
  }

  getBool(key: string): boolean | undefined;
  getBool(key: string, defaultValue: boolean): boolean;
  getBool(key: string, defaultValue?: boolean): boolean | undefined {
    const value: ToString | undefined = this.get(key);

    if (value != null) {
      return BooleanParser.WEAK.parse(value.toString());
    }

    return defaultValue;
  }

  getFloat(key: string): number | undefined;
  getFloat(key: string, defaultValue: number): number;
  getFloat(key: string, defaultValue?: number): number | undefined {
    const value: ToString | undefined = this.getFirst(key);

    if (value != null) {
      return FloatParser.WEAK.parse(value.toString());
    }

    return defaultValue;
  }

  * getFloats(key: string): Iterable<number> {
    const values: Iterable<ToString> = this.get(key);

    for (const value of values) {
      yield FloatParser.WEAK.parse(value.toString());
    }
  }

  getInt(key: string): number | undefined;
  getInt(key: string, defaultValue: number): number;
  getInt(key: string, defaultValue?: number): number | undefined {
    const value: ToString | undefined = this.getFirst(key);

    if (value != null) {
      return IntParser.WEAK.parse(value.toString());
    }

    return defaultValue;
  }

  * getAllInt(key: string): Iterable<number> {
    const values: Iterable<ToString> = this.params.get(key);

    for (const value of values) {
      yield IntParser.WEAK.parse(value.toString());
    }
  }

  getString(key: string): string | undefined;
  getString(key: string, defaultValue: string): string;
  getString(key: string, defaultValue?: string): string | undefined {
    const value: ToString | undefined = this.params.getFirst(key);

    if (value != null) {
      return value.toString();
    }

    return defaultValue;
  }

  * getAll(key: string): Iterable<string> {
    const values: Iterable<ToString> = this.params.get(key);

    for (const value of values) {
      yield value.toString();
    }
  }

  toString(): string {
    let buffer = '';
    let first = true;

    for (const [name, value] of this.params) {
      if (!first) {
        buffer += '&';
      }

      buffer += encodeURIComponent(name);
      buffer += '=';
      buffer += encodeURIComponent(value.toString());

      first = false;
    }

    return buffer;
  }

  toJSON(): Iterable<KeyValuePair<string, ToString>> {
    return this.params.toArray();
  }

  withParameter(name: string, value: ToString): Query {
    return new Query([
      ...this,
      [name, value]
    ]);
  }

  withoutParameter(name: string): Query;
  withoutParameter(name: string, value: ToString): Query;
  withoutParameter(name: string, value?: ToString): Query {
    if (value != null) {
      return new Query(this.params.filter((_name, _value) => {
        return !MultiValueEquals([
          [name, _name, PreserveCaseEquals],
          [value, _value, StrictEquals]
        ]);
      }));
    } else {
      return new Query(this.params.filter(_name => {
        return !MultiValueEquals([
          [name, _name, PreserveCaseEquals]
        ]);
      }));
    }
  }

}
