import {ReadOnlySet} from '../collection/ReadOnlySet';
import {Key} from '../object-model/attributes/Key';
import {DefaultAttributeAccessor} from '../object-model/attributes/support/DefaultAttributeAccessor';
import {DefaultDecoratorAccessor} from './DefaultDecoratorAccessor';
import {AccessibleObject} from './AccessibleObject';


export class DefaultAccessibleObject implements AccessibleObject {
    private readonly _attributes: DefaultAttributeAccessor = new DefaultAttributeAccessor();
    private readonly _decorators: DefaultDecoratorAccessor = new DefaultDecoratorAccessor();

    public get decorators(): ReadOnlySet<Function> {
        return this._decorators.decorators;
    }


    public get attributeKeys(): ReadOnlySet<Key<any>> {
        return this._attributes.attributeKeys;
    }


    public getAttribute<T>(key: Key<T>): T | undefined {
        return this._attributes.getAttribute(key);
    }


    public hasAttribute<T>(key: Key<T>): boolean {
        return this._attributes.hasAttribute(key);
    }


    public isDecoratedWith(decorator: Function): boolean {
        return this._decorators.isDecoratedWith(decorator);
    }


    public decorate(decorator: Function): boolean {
        return this._decorators.decorate(decorator);
    }


    public removeAttribute<T>(key: Key<T>): boolean {
        return this._attributes.removeAttribute(key);
    }


    public setAttribute<T>(key: Key<T>, value: T): void {
        this._attributes.setAttribute(key, value);
    }
}
