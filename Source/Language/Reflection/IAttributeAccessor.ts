import {Key} from './Key';
import {IEnumerable} from '../../Collections/Abstraction/IEnumerable';


export interface IAttributeAccessor {
    readonly attributeKeys: IEnumerable<Key>;

    getAttribute<T>(key: Key): T | undefined;
    hasAttribute(key: Key): boolean;
    setAttribute<T>(key: Key, value: T): void;
    removeAttribute<T>(key: Key): T | undefined;
    removeAllAttributes(): void;
}
