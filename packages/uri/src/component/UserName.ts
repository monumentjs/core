import { argument } from '@monument/assert';
import { Equatable } from '@monument/comparison';
import { Component } from './Component';

export class UserName implements Component<string | undefined>, Equatable<UserName> {
  readonly value: string | undefined;
  readonly isDefined: boolean;

  constructor(username?: string) {
    if (username != null) {
      argument(username.length > 0);

      this.value = username;
    }

    this.isDefined = !!username;
  }

  equals(other: UserName): boolean {
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
