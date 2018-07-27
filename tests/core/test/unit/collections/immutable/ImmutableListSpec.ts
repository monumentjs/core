import {ImmutableListImpl} from '@monument/core/main/collection/immutable/ImmutableListImpl';
import {StrictEqualityComparator} from '@monument/core/main/utils/comparison/StrictEqualityComparator';


export class ImmutableListSpec {
    private readonly _list!: ImmutableListImpl<number>;

    public 'return types'() {
        const length: number = this._list.length;
        const isEmpty: boolean = this._list.isEmpty;
        const toArray: number[] = this._list.toArray();
        const contains1: boolean = this._list.contains(0);
        const contains2: boolean = this._list.contains(0, new StrictEqualityComparator());
        const containsAll1: boolean = this._list.containsAll([0]);
        const containsAll2: boolean = this._list.containsAll([0], new StrictEqualityComparator());
        const add: ImmutableListImpl<number> = this._list.add(0);
        const addAll: ImmutableListImpl<number> = this._list.addAll([0]);
        const clear: ImmutableListImpl<number> = this._list.clear();
        const remove1: ImmutableListImpl<number> = this._list.remove(0);
        const remove2: ImmutableListImpl<number> = this._list.remove(0, new StrictEqualityComparator());
        const removeAll1: ImmutableListImpl<number> = this._list.removeAll([0]);
        const removeAll2: ImmutableListImpl<number> = this._list.removeAll([0], new StrictEqualityComparator());
        const removeBy: ImmutableListImpl<number> = this._list.removeBy((item: number, index: number): boolean => {
            return true;
        });
        const insert: ImmutableListImpl<number> = this._list.insert(0, 0);
        const insertAll: ImmutableListImpl<number> = this._list.insertAll(0, [0]);
        const indexOf1: number = this._list.indexOf(0);
        const indexOf2: number = this._list.indexOf(0, 0);
        const indexOf3: number = this._list.indexOf(0, 0, 0);
        const indexOf4: number = this._list.indexOf(0, 0, 0, new StrictEqualityComparator());
        const lastIndexOf1: number = this._list.lastIndexOf(0);
        const lastIndexOf2: number = this._list.lastIndexOf(0, 0);
        const lastIndexOf3: number = this._list.lastIndexOf(0, 0, 0);
        const lastIndexOf4: number = this._list.lastIndexOf(0, 0, 0, new StrictEqualityComparator());
    }
}
