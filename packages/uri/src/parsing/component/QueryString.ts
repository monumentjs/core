import { ToJSON, ToString } from '@monument/core';
import { KeyValuePair } from '@monument/collections';

export class QueryString implements Iterable<KeyValuePair<string, string>>, ToString, ToJSON<string> {
  readonly entries: ReadonlyArray<KeyValuePair<string, string>> = [];

  constructor(readonly source: string) {
    this.entries = source
      .split('&')
      .map(item => item.split('=', 2))
      .filter(pair => pair[1] != null)
      .map(([name, value]) => [
        decodeURIComponent(name),
        decodeURIComponent(value)
      ]);
  }

  [Symbol.iterator](): Iterator<KeyValuePair<string, string>> {
    return this.entries[Symbol.iterator]();
  }

  toString(): string {
    return this.entries
      .map(([name, value]) => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`)
      .join('&');
  }

  toJSON(): string {
    return this.toString();
  }
}
