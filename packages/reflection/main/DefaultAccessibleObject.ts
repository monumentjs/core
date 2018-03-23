import {ReadOnlySet} from '@monument/collections-core/main/ReadOnlySet';
import {DefaultAttributeAccessor} from '@monument/object-model/main/attributes/support/DefaultAttributeAccessor';
import {AttributeAccessor} from '@monument/object-model/main/attributes/AttributeAccessor';
import {Key} from '@monument/object-model/main/Key';
import {DecoratorAccessor} from './DecoratorAccessor';
import {DefaultDecoratorAccessor} from './DefaultDecoratorAccessor';
import {AccessibleObject} from './AccessibleObject';


export class DefaultAccessibleObject implements AccessibleObject {
    private readonly _attributes: AttributeAccessor = new DefaultAttributeAccessor();
    private readonly _decorators: DecoratorAccessor = new DefaultDecoratorAccessor();


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
