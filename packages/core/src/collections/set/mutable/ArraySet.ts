import {Set} from './Set';
import {ArrayList} from '../../list/mutable/ArrayList';
import {IteratorFunction} from '../../base/IteratorFunction';
import {Sequence} from '../../base/Sequence';
import {QueryableProxy} from '../../base/proxy/QueryableProxy';
import {Cloneable} from '../../../base/Cloneable';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {StrictEqualityComparator} from '../../../comparison/equality/StrictEqualityComparator';
import {EventDispatcher} from '../../../events/EventDispatcher';
import {EventSource} from '../../../events/EventSource';
import {SetChangedEventArgs} from '../observable/SetChangedEventArgs';
import {SetChangeTransaction} from '../observable/SetChangeTransaction';
import {InvalidStateException} from '../../../exceptions/InvalidStateException';
import {MethodNotImplementedException} from '../../../exceptions/MethodNotImplementedException';
import {ListChangedEventArgs} from '../../list/observable/ListChangedEventArgs';
import {InvalidArgumentException} from '../../../exceptions/InvalidArgumentException';
import {ListChangeType} from '../../list/observable/ListChangeType';
import {SetChange} from '../observable/SetChange';
import {SetChangeKind} from '../observable/SetChangeKind';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ArraySet<T> extends QueryableProxy<T, ArrayList<T>> implements Set<T>, Cloneable<ArraySet<T>> {
    private readonly _comparator: EqualityComparator<T>;
    private readonly _changed: EventDispatcher<SetChangedEventArgs<T>> = new EventDispatcher();
    private _changeTransaction: SetChangeTransaction<T> | undefined;

    public get changed(): EventSource<SetChangedEventArgs<T>> {
        return this._changed;
    }

    public get comparator(): EqualityComparator<T> {
        return this._comparator;
    }

    public constructor(items?: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()) {
        super(new ArrayList());
        this._comparator = comparator;

        if (items != null) {
            this.addAll(items);
        }

        this._items.changed.subscribe((_: ListChangedEventArgs<T>) => {
            const args: SetChangedEventArgs<T> = new SetChangedEventArgs(this, _.changes.filter((change) => {
                return change.type === ListChangeType.ITEM_ADDED ||
                    change.type === ListChangeType.ITEM_REMOVED ||
                    change.type === ListChangeType.LIST_CLEARED;
            }).map<SetChange<T>>((change) => {
                switch (change.type) {
                    case ListChangeType.ITEM_ADDED:
                        return {
                            type: SetChangeKind.ITEM_ADDED,
                            item: change.item
                        };
                    case ListChangeType.ITEM_REMOVED:
                        return {
                            type: SetChangeKind.ITEM_REMOVED,
                            item: change.item
                        };
                    case ListChangeType.LIST_CLEARED:
                        return {
                            type: SetChangeKind.SET_CLEARED,
                            itemsRemoved: change.itemsRemoved
                        };
                    default:
                        throw new InvalidArgumentException('Item insertion operation not supported by set.');
                }
            }));

            this._changed.trigger(args);
        });
    }

    public add(item: T): boolean {
        return this._items.addIfAbsent(item, this.comparator);
    }

    public addAll(items: Sequence<T>): boolean {
        if (items.length === 0) {
            return false;
        }

        const oldLength: number = this.length;

        this.beginTransaction();

        for (const item of items) {
            this._items.addIfAbsent(item, this.comparator);
        }

        this.endTransaction();

        return this.length > oldLength;
    }

    public clear(): boolean {
        this.beginTransaction();

        const length: number = this.length;
        const cleared: boolean = this._items.clear();

        if (cleared) {
            this.onClear(length);
        }

        this.endTransaction();

        return cleared;
    }

    public clone(): ArraySet<T> {
        return new ArraySet(this, this.comparator);
    }

    public intersectWith(other: Sequence<T>): boolean {
        /* tslint:disable:cyclomatic-complexity */

        let hasChanged: boolean = false;

        for (const currentItem of this) {
            let itemPresentInBothSets: boolean = false;

            for (const otherItem of other) {
                if (this.comparator.equals(currentItem, otherItem)) {
                    itemPresentInBothSets = true;

                    break;
                }
            }

            if (!itemPresentInBothSets) {
                if (this.remove(currentItem)) {
                    hasChanged = true;
                }
            }
        }

        return hasChanged;
    }

    public isProperSubsetOf(other: Sequence<T>): boolean {
        if (this.length >= other.length) {
            return false;
        }

        return this.isSubsetOf(other);
    }

    public isProperSupersetOf(other: Sequence<T>): boolean {
        if (this.length <= other.length) {
            return false;
        }

        return this.isSupersetOf(other);
    }

    public isSubsetOf(other: Sequence<T>): boolean {
        let isValidSubset: boolean = true;

        for (const currentItem of this) {
            let isCurrentItemInOtherSet: boolean = false;

            for (const otherItem of other) {
                if (this.comparator.equals(currentItem, otherItem)) {
                    isCurrentItemInOtherSet = true;

                    break;
                }
            }

            if (!isCurrentItemInOtherSet) {
                isValidSubset = false;

                break;
            }
        }

        return isValidSubset;
    }

    public isSupersetOf(other: Sequence<T>): boolean {
        let isValidSuperset: boolean = true;

        for (const otherItem of other) {
            let isOtherItemInCurrentSet: boolean = false;

            for (const currentItem of this) {
                if (this.comparator.equals(currentItem, otherItem)) {
                    isOtherItemInCurrentSet = true;

                    break;
                }
            }

            if (!isOtherItemInCurrentSet) {
                isValidSuperset = false;

                break;
            }
        }

        return isValidSuperset;
    }

    public overlaps(other: Sequence<T>): boolean {
        for (const currentItem of this) {
            for (const otherItem of other) {
                if (this.comparator.equals(currentItem, otherItem)) {
                    return true;
                }
            }
        }

        return false;
    }

    public remove(otherItem: T): boolean {
        return this._items.remove(otherItem, this.comparator);
    }

    public removeAll(items: Sequence<T>): boolean {
        return this._items.removeAll(items, this.comparator);
    }

    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        return this._items.removeBy(predicate);
    }

    public retainAll(items: Sequence<T>): boolean {
        return this._items.retainAll(items, this.comparator);
    }

    public setEquals(other: Sequence<T>): boolean {
        /* tslint:disable:cyclomatic-complexity */

        if (this.length !== other.length) {
            return false;
        }

        for (const otherItem of other) {
            if (!this.contains(otherItem)) {
                return false;
            }
        }

        for (const currentItem of this) {
            let currentItemInOtherCollection: boolean = false;

            for (const otherItem of other) {
                if (this.comparator.equals(currentItem, otherItem)) {
                    currentItemInOtherCollection = true;

                    break;
                }
            }

            if (!currentItemInOtherCollection) {
                return false;
            }
        }

        return true;
    }

    public symmetricExceptWith(other: Sequence<T>): boolean {
        let hasChanged: boolean = false;

        for (const otherItem of other) {
            if (this.contains(otherItem)) {
                if (this.remove(otherItem)) {
                    hasChanged = true;
                }
            } else {
                if (this.add(otherItem)) {
                    hasChanged = true;
                }
            }
        }

        return hasChanged;
    }

    public unionWith(other: Sequence<T>): boolean {
        throw new MethodNotImplementedException('Method "unionWith" is not implemented yet');
    }

    protected beginTransaction() {
        if (this._changeTransaction == null) {
            this._changeTransaction = new SetChangeTransaction(this, this._changed);
        }
    }

    protected endTransaction() {
        if (this._changeTransaction != null) {
            this._changeTransaction.close();
            this._changeTransaction = undefined;
        }
    }

    protected onAdd(item: T) {
        if (this._changeTransaction) {
            this._changeTransaction.onItemAdded(item);
        } else {
            throw new InvalidStateException('Change transaction is not started.');
        }
    }

    protected onClear(itemsRemoved: number) {
        if (this._changeTransaction) {
            this._changeTransaction.onListCleared(itemsRemoved);
        } else {
            throw new InvalidStateException('Change transaction is not started.');
        }
    }

    protected onRemove(item: T) {
        if (this._changeTransaction) {
            this._changeTransaction.onItemRemoved(item);
        } else {
            throw new InvalidStateException('Change transaction is not started.');
        }
    }
}
