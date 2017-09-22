import {IAttributeAccessor} from './IAttributeAccessor';
import {Key} from './Key';
import {IEnumerable} from '../../Collections/Abstraction/IEnumerable';
import {Attributes} from './Attributes';


export abstract class AttributeAccessorSupport implements IAttributeAccessor {
    private _attributes: Attributes = new Attributes();


    public get attributeKeys(): IEnumerable<Key> {
        return this._attributes.keys;
    }


    public getAttribute<T>(key: Key): T | undefined {
        return this._attributes.get(key);
    }


    public hasAttribute(key: Key): boolean {
        return this._attributes.containsKey(key);
    }


    public setAttribute<T>(key: Key, value: T): void {
        this._attributes.put(key, value);
    }


    public removeAttribute<T>(key: Key): T | undefined {
        return this._attributes.remove(key);
    }


    public removeAllAttributes(): void {
        this._attributes.clear();
    }


    protected copyAttributesFrom(accessor: IAttributeAccessor): void {
        for (let key of accessor.attributeKeys) {
            this.setAttribute(key, accessor.getAttribute(key));
        }
    }
}
