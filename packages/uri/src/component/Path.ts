import { argument } from '@monument/assert';
import { Equatable } from '@monument/comparison';
import { Component } from './Component';

export class Path implements Component<string | undefined>, Equatable<Path> {
  readonly value: string | undefined;
  readonly isDefined: boolean;

  constructor(path?: string) {
    if (path != null) {
      argument(path.length > 0);
    }

    this.value = path;
    this.isDefined = !!path;
  }

  equals(other: Path): boolean {
    return this.value === other.value;
  }

  toString(): string {
    if (this.value) {
      return encodeURI(this.value);
    } else {
      return '';
    }
  }

  toJSON(): string | undefined {
    return this.value;
  }

  // TODO: isRelative, isAbsolute, segments
}
