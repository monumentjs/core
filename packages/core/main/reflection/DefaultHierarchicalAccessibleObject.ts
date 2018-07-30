import {ReadOnlyCollection} from '../collection/readonly/ReadOnlyCollection';
import {ReadOnlySet} from '../collection/readonly/ReadOnlySet';
import {Key} from '../object-model/attributes/Key';
import {DefaultHierarchicalAttributeAccessor} from '../object-model/attributes/support/DefaultHierarchicalAttributeAccessor';
import {DefaultHierarchicalDecoratorAccessor} from './DefaultHierarchicalDecoratorAccessor';
import {HierarchicalAccessibleObject} from './HierarchicalAccessibleObject';


export class DefaultHierarchicalAccessibleObject implements HierarchicalAccessibleObject {
    private readonly _attributes: DefaultHierarchicalAttributeAccessor;
    private readonly _decorators: DefaultHierarchicalDecoratorAccessor;
    private _parent: HierarchicalAccessibleObject | undefined;


    public get attributeKeys(): ReadOnlySet<Key<any>> {
        return this._attributes.attributeKeys;
    }


    public get declaredAttributeKeys(): ReadOnlySet<Key<any>> {
        return this._attributes.declaredAttributeKeys;
    }


    public get declaredDecorators(): ReadOnlySet<Function> {
        return this._decorators.declaredDecorators;
    }


    public get decorators(): ReadOnlySet<Function> {
        return this._decorators.decorators;
    }


    public get parent(): HierarchicalAccessibleObject | undefined {
        return this._parent;
    }


    public constructor(parent?: HierarchicalAccessibleObject) {
        this._attributes = new DefaultHierarchicalAttributeAccessor();
        this._decorators = new DefaultHierarchicalDecoratorAccessor();
        this.setParent(parent);
    }


    public getAttribute<T>(key: Key<T>): T | undefined {
        return this._attributes.getAttribute(key);
    }


    public getAttributeValues<T>(key: Key<T>): ReadOnlyCollection<T> {
        return this._attributes.getAttributeValues(key);
    }


    public getDeclaredAttribute<T>(key: Key<T>): T | undefined {
        return this._attributes.getDeclaredAttribute(key);
    }


    public hasAttribute<T>(key: Key<T>): boolean {
        return this._attributes.hasAttribute(key);
    }


    public hasDeclaredAttribute<T>(key: Key<T>): boolean {
        return this._attributes.hasDeclaredAttribute(key);
    }


    public isDecoratedWith(annotation: Function): boolean {
        return this._decorators.isDecoratedWith(annotation);
    }


    public decorate(annotation: Function): boolean {
        return this._decorators.decorate(annotation);
    }


    public removeAttribute<T>(key: Key<T>): boolean {
        return this._attributes.removeAttribute(key);
    }


    public removeDeclaredAttribute<T>(key: Key<T>): boolean {
        return this._attributes.removeDeclaredAttribute(key);
    }


    public setAttribute<T>(key: Key<T>, value: T): void {
        this._attributes.setAttribute(key, value);
    }


    protected hasParent(): boolean {
        return this._parent != null;
    }


    protected getParent(): HierarchicalAccessibleObject | undefined {
        return this._parent;
    }


    protected setParent(parent: HierarchicalAccessibleObject | undefined): void {
        this._parent = parent;
        this._attributes.parent = parent;
        this._decorators.parent = parent;
    }
}
