import { argument } from '@monument/assert';
import { Equatable } from '@monument/comparison';
import { Component } from './Component';

export class Port implements Component<number | undefined>, Equatable<Port | number | undefined> {
  readonly value: number | undefined;
  readonly isDefined: boolean;

  constructor(port?: number) {
    if (port != null) {
      argument(!isNaN(port));
      argument(Number.isFinite(port));
      argument(Number.isSafeInteger(port));
      argument(port >= 0 && port <= 65535);

      this.value = port;
    }

    this.isDefined = this.value != null;
  }

  equals(other: Port | number | undefined): boolean {
    switch (typeof other) {
      case 'object':
        return this.value === other.value;
      case 'number':
      case 'undefined':
        return this.equals(new Port(other));
    }
  }

  toString(): string {
    if (this.value != null) {
      return this.value.toString(10);
    } else {
      return '';
    }
  }

  toJSON(): number | undefined {
    return this.value;
  }
}
