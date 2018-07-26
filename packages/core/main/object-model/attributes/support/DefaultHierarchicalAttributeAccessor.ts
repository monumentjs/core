import {ReadOnlyCollection} from '../../../collection/readonly/ReadOnlyCollection';
import {ReadOnlySet} from '../../../collection/readonly/ReadOnlySet';
import {List} from '../../../collection/mutable/List';
import {Set} from '../../../collection/mutable/Set';
import {Map} from '../../../collection/mutable/Map';
import {ArrayList} from '../../../collection/mutable/ArrayList';
import {ListSet} from '../../../collection/mutable/ListSet';
import {ListMap} from '../../../collection/mutable/ListMap';
import {Key} from '../Key';
import {HierarchicalAttributeAccessor} from '../HierarchicalAttributeAccessor';


export class DefaultHierarchicalAttributeAccessor implements HierarchicalAttributeAccessor {
    private readonly _attributes: Map<Key<any>, any> = new ListMap();
    private _parent: HierarchicalAttributeAccessor | undefined;


    public get attributeKeys(): ReadOnlySet<Key<any>> {
        let keys: Set<Key<any>> = new ListSet(this.declaredAttributeKeys);

        if (this.parent != null) {
            keys.addAll(this.parent.attributeKeys);
        }

        return keys;
    }


    // HierarchicalAttributeAccessor


    public get parent(): HierarchicalAttributeAccessor | undefined {
        return this._parent;
    }


    public set parent(value: HierarchicalAttributeAccessor | undefined) {
        this._parent = value;
    }


    public get declaredAttributeKeys(): ReadOnlySet<Key<any>> {
        return this._attributes.keys;
    }


    public constructor(parent?: HierarchicalAttributeAccessor) {
        this._parent = parent;
    }


    // AttributeAccessor


    public getAttribute<T>(key: Key<T>): T | undefined {
        if (this.hasDeclaredAttribute(key)) {
            return this.getDeclaredAttribute(key);
        }

        if (this.parent != null) {
            return this.parent.getAttribute(key);
        }

        return undefined;
    }


    public setAttribute<T>(key: Key<T>, value: T): void {
        this._attributes.put(key, value);
    }


    public hasAttribute<T>(key: Key<T>): boolean {
        if (this.hasDeclaredAttribute(key)) {
            return true;
        }

        if (this.parent != null) {
            return this.parent.hasAttribute(key);
        }

        return false;
    }


    public removeAttribute<T>(key: Key<T>): boolean {
        let ownAttributeRemoved: boolean = this.removeDeclaredAttribute(key);
        let parentAttributeRemoved: boolean = false;

        if (this.parent != null) {
            parentAttributeRemoved = this.parent.removeAttribute(key);
        }

        return ownAttributeRemoved || parentAttributeRemoved;
    }


    // HierarchicalAttributeAccessor


    public getDeclaredAttribute<T>(key: Key<T>): T | undefined {
        return this._attributes.get(key);
    }


    public hasDeclaredAttribute<T>(key: Key<T>): boolean {
        return this._attributes.containsKey(key);
    }


    public removeDeclaredAttribute<T>(key: Key<T>): boolean {
        return this._attributes.remove(key);
    }


    public getAttributeValues<T>(key: Key<T>): ReadOnlyCollection<T> {
        let accumulator: List<T> = new ArrayList();
        let accessor: HierarchicalAttributeAccessor | undefined = this;

        while (accessor != null) {
            let value: T | undefined = accessor.getDeclaredAttribute(key);

            if (value !== undefined) {
                accumulator.add(value);
            }

            accessor = accessor.parent;
        }

        return accumulator;
    }
}
