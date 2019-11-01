import { argument } from '@monument/assert';
import { Equatable } from '@monument/comparison';
import { TextPrinter } from '@monument/text';
import { Component } from '../base/Component';

export class Password implements Component, Equatable<Password> {
  static decode(source: string | undefined): Password {
    return new Password(source != null ? decodeURIComponent(source) : source);
  }

  readonly value: string | undefined;
  readonly present: boolean = false;

  constructor(password?: string) {
    if (password != null) {
      argument(password.length > 0);

      this.value = password;
      this.present = true;
    }
  }

  equals(other: Password): boolean {
    return this.value === other.value;
  }

  toJSON(): string | undefined {
    return this.value;
  }

  toString(): string {
    return this.value != null ? encodeURIComponent(this.value) : '';
  }

  print(printer: TextPrinter): void {
    printer.append(this);
  }
}
