import { Equatable } from '@monument/comparison';
import { Component } from './Component';

export class Fragment implements Component<string | undefined>, Equatable<Fragment> {
  readonly value: string | undefined;
  readonly isDefined: boolean;

  constructor(fragment?: string) {
    this.value = fragment;
    this.isDefined = fragment != null;
  }

  equals(other: Fragment): boolean {
    return this.value === other.value;
  }

  toString(): string {
    if (this.value != null) {
      return encodeURIComponent(this.value);
    } else {
      return '';
    }
  }

  toJSON(): string | undefined {
    return this.value;
  }
}
