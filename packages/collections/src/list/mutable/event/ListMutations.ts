import { ReadOnlyList } from '../../readonly/ReadOnlyList';
import { ArrayList } from '../../immutable/ArrayList';

export interface AddMutation<T> {
  readonly position: number;
  readonly value: T;
}

export interface RemoveMutation<T> {
  readonly position: number;
  readonly value: T;
}

export interface ReplaceMutation<T> {
  readonly position: number;
  readonly from: T;
  readonly to: T;
}

export interface MoveMutation<T> {
  readonly fromPosition: number;
  readonly toPosition: number;
  readonly value: T;
}

export interface ListMutationOptions<T> {
  readonly added?: Iterable<AddMutation<T>>;
  readonly removed?: Iterable<RemoveMutation<T>>;
  readonly replaced?: Iterable<ReplaceMutation<T>>;
  readonly moved?: Iterable<MoveMutation<T>>;
}

export class ListMutations<T> {
  readonly added: ReadOnlyList<AddMutation<T>>;
  readonly removed: ReadOnlyList<RemoveMutation<T>>;
  readonly replaced: ReadOnlyList<ReplaceMutation<T>>;
  readonly moved: ReadOnlyList<MoveMutation<T>>;

  constructor({ added, removed, replaced, moved }: ListMutationOptions<T>) {
    this.added = new ArrayList(added);
    this.removed = new ArrayList(removed);
    this.replaced = new ArrayList(replaced);
    this.moved = new ArrayList(moved);
  }
}
