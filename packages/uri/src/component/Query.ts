import { Delegate, ToString } from '@monument/core';
import { Equatable } from '@monument/comparison';
import { KeyValuePair } from '@monument/collections';
import { Component } from '../base/Component';

export interface Query extends Component, Equatable<Query> {

  readonly keys: Iterable<string>;

  has(name: string): boolean;

  has(name: string, value: ToString): boolean;

  get(name: string): ToString | undefined;

  get<T>(name: string, project: Delegate<[ToString], T>): T | undefined;

  getAll(name: string): Iterable<ToString>;

  getAll<R>(name: string, project: Delegate<[ToString], R>): Iterable<R>;

  with(name: string, value: ToString): Query;

  withAll(entries: Iterable<KeyValuePair<string, ToString>>): Query;

  without(name: string): Query;

  withoutIf(name: string, value: ToString): Query;

  replaceAll(name: string, value: ToString): Query;

  replaceIf(name: string, oldValue: ToString, newValue: ToString): Query;
}
