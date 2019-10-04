import { argument } from '@monument/assert';
import { Equatable } from '@monument/comparison';
import { Component } from './Component';

export class Password implements Component<string | undefined>, Equatable<Password> {
  readonly value: string | undefined;
  readonly isDefined: boolean;

  constructor(password?: string) {
    if (password != null) {
      argument(password.length > 0);

      this.value = password;
    }

    this.isDefined = !!password;
  }

  equals(other: Password): boolean {
    return this.value === other.value;
  }

  toString(): string {
    if (this.value) {
      return encodeURIComponent(this.value);
    } else {
      return '';
    }
  }

  toJSON(): string | undefined {
    return this.value;
  }
}
