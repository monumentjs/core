import {ImmutableList} from '@monument/core/main/collection/immutable/ImmutableList';
import {StrictEqualityComparator} from '@monument/core/main/utils/StrictEqualityComparator';


export class ImmutableListSpec {
    private readonly _list!: ImmutableList<number>;

    public 'return types'() {
        const length: number = this._list.length;
        const isEmpty: boolean = this._list.isEmpty;
        const toArray: number[] = this._list.toArray();
        const contains1: boolean = this._list.contains(0);
        const contains2: boolean = this._list.contains(0, new StrictEqualityComparator());
        const containsAll1: boolean = this._list.containsAll([0]);
        const containsAll2: boolean = this._list.containsAll([0], new StrictEqualityComparator());
        const add: ImmutableList<number> = this._list.add(0);
        const addAll: ImmutableList<number> = this._list.addAll([0]);
        const clear: ImmutableList<number> = this._list.clear();
        const remove1: ImmutableList<number> = this._list.remove(0);
        const remove2: ImmutableList<number> = this._list.remove(0, new StrictEqualityComparator());
        const removeAll1: ImmutableList<number> = this._list.removeAll([0]);
        const removeAll2: ImmutableList<number> = this._list.removeAll([0], new StrictEqualityComparator());
        const removeBy: ImmutableList<number> = this._list.removeBy((item: number, index: number): boolean => {
            return true;
        });
        const insert: ImmutableList<number> = this._list.insert(0, 0);
        const insertAll: ImmutableList<number> = this._list.insertAll(0, [0]);
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
