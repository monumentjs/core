import { argument } from '@monument/assert';
import { Equatable } from '@monument/comparison';
import { Component } from './Component';

export class Host implements Component<string | undefined>, Equatable<Host> {
  readonly value: string | undefined;
  readonly isDefined: boolean;

  constructor(host?: string) {
    if (host != null) {
      argument(host.length > 0);
    }

    this.value = host;
    this.isDefined = !!host;
  }

  equals(other: Host): boolean {
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

  // TODO: isIP, asIP etc
}
