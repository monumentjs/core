import { Func1, ToString } from '@monument/core';

export interface TextBuffer {
  append(text: string): this;

  appendFormat(format: string, ...values: ToString[]): this;

  appendLine(text: string): this;

  appendObject(obj: object): this;

  prepend(text: string): this;

  prependFormat(format: string, ...values: ToString[]): this;

  prependLine(text: string): this;

  prependObject(obj: object): this;

  surround(before: string, after: string): this;

  transform(fn: Func1<string, string>): void;
}
