import { ToString } from '@monument/core';
import { NamedPool } from '@monument/collections';
import { MissingKeyException } from '@monument/exceptions';
import { Printable } from '../Printable';
import { Printer } from '../Printer';

const TOKENS = /(?<![\\]){\s*(\w+)\s*(?<![\\])}/g;

export class TemplateString implements ToString, Printable<ToString> {
  private content?: string;

  constructor(private readonly template: string, private readonly entries: Array<ToString> | NamedPool<ToString> = {}) {
  }

  toString(): string {
    if (this.content == null) {
      this.content = this.template.replace(TOKENS, (substring, token) => {
        const value: ToString | undefined = (this.entries as any)[token];

        if (value == null) {
          throw new MissingKeyException(`Entry "${token}" not found or nullable`);
        }

        return value.toString();
      });
    }

    return this.content;
  }

  print(printer: Printer<ToString>): void {
    printer.append(this);
  }
}
