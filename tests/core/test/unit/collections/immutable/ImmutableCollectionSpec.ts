import {ImmutableCollection} from '@monument/core/main/collection/immutable/ImmutableCollection';


export class ImmutableCollectionSpec {
    private readonly _collection!: ImmutableCollection<number>;

    public 'return types'() {
        const length: number = this._collection.length;
        const isEmpty: boolean = this._collection.isEmpty;
        const toArray: number[] = this._collection.toArray();
        const contains: boolean = this._collection.contains(0);
        const containsAll: boolean = this._collection.containsAll([0]);
        const add: ImmutableCollection<number> = this._collection.add(0);
        const addAll: ImmutableCollection<number> = this._collection.addAll([0]);
        const clear: ImmutableCollection<number> = this._collection.clear();
        const remove: ImmutableCollection<number> = this._collection.remove(0);
        const removeAll: ImmutableCollection<number> = this._collection.removeAll([0]);
        const removeBy: ImmutableCollection<number> = this._collection.removeBy((item: number, index: number): boolean => {
            return true;
        });
    }
}
