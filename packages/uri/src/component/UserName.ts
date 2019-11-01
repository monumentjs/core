import { argument } from '@monument/assert';
import { Equatable } from '@monument/comparison';
import { TextPrinter } from '@monument/text';
import { Component } from '../base/Component';

export class UserName implements Component, Equatable<UserName> {
  static decode(source: string | undefined): UserName {
    return new UserName(source != null ? decodeURIComponent(source) : source);
  }

  readonly value: string | undefined;
  readonly present: boolean = false;

  constructor(username?: string) {
    if (username != null) {
      argument(username.length > 0);

      this.value = username;
      this.present = true;
    }
  }

  equals(other: UserName): boolean {
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
