import {ReadOnlySet} from '@monument/collections-core/main/ReadOnlySet';
import {AttributeAccessor} from './AttributeAccessor';
import {Key} from '../Key';
import {ReadOnlyCollection} from '@monument/collections-core/main/ReadOnlyCollection';


export interface HierarchicalAttributeAccessor extends AttributeAccessor {
    parent: HierarchicalAttributeAccessor | undefined;
    readonly declaredAttributeKeys: ReadOnlySet<Key<any>>;

    getAttributeValues<T>(key: Key<T>): ReadOnlyCollection<T>;

    getDeclaredAttribute<T>(key: Key<T>): T | undefined;
    hasDeclaredAttribute<T>(key: Key<T>): boolean;
    removeDeclaredAttribute<T>(key: Key<T>): boolean;
}
