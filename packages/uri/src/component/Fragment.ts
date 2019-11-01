import { TextPrinter } from '@monument/text';
import { Component } from '../base/Component';
import { Equatable } from '@monument/comparison';

export class Fragment implements Component<string | undefined>, Equatable<Fragment> {
  static decode(fragment: string | undefined): Fragment {
    return new Fragment(fragment != null ? decodeURIComponent(fragment) : fragment);
  }

  readonly value: string | undefined;

  constructor(fragment?: string) {
    this.value = fragment;
  }

  equals(other: Fragment): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value != null ? encodeURIComponent(this.value) : '';
  }

  toJSON(): string | undefined {
    return this.value;
  }
}
