import { ChangeKind } from './ChangeKind';

export class ChangeEvent {
  readonly kind: ChangeKind;
  readonly path: PropertyKey[];

  constructor(kind: ChangeKind, path: PropertyKey[]) {
    this.kind = kind;
    this.path = path;
  }
}
