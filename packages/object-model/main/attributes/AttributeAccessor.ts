import {ReadOnlySet} from '@monument/collections/main/ReadOnlySet';
import {Key} from './Key';


/**
 * Interface defining a generic contract for attaching and accessing own attributes.
 */
export interface AttributeAccessor {
    readonly attributeKeys: ReadOnlySet<Key<any>>;

    getAttribute<T>(key: Key<T>): T | undefined;
    hasAttribute<T>(key: Key<T>): boolean;
    setAttribute<T>(key: Key<T>, value: T): void;
    removeAttribute<T>(key: Key<T>): boolean;
}
