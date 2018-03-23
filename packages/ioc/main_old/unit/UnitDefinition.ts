import {Collection} from '@monument/collections-core/main/Collection';
import {ReadOnlyCollection} from '@monument/collections-core/main/ReadOnlyCollection';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {DefaultAttributeAccessor} from '@monument/object-model/main/attributes/support/DefaultAttributeAccessor';
import {Class} from '@monument/reflection/main/Class';


export class UnitDefinition extends DefaultAttributeAccessor {
    public static readonly SINGLETON_SCOPE: string = 'singleton';
    public static readonly PROTOTYPE_SCOPE: string = 'prototype';

    private readonly _unitClass: Class;
    private readonly _postConstructMethodNames: Collection<PropertyKey> = new ArrayList();
    private _scope: string = UnitDefinition.SINGLETON_SCOPE;
    private _isPrimary: boolean = false;
    private _initMethodName: PropertyKey | undefined;
    private _destroyMethodName: PropertyKey | undefined;
    private _factoryMethodName: PropertyKey | undefined;
    private _factoryUnitName: string | undefined;


    public get unitClass(): Class {
        return this._unitClass;
    }


    public get isPrimary(): boolean {
        return this._isPrimary;
    }


    public set isPrimary(value: boolean) {
        this._isPrimary = value;
    }


    public get scope(): string {
        return this._scope;
    }


    public set scope(value: string) {
        this._scope = value;
    }


    public get isSingleton(): boolean {
        return this.scope === UnitDefinition.SINGLETON_SCOPE;
    }


    public get isPrototype(): boolean {
        return this.scope === UnitDefinition.PROTOTYPE_SCOPE;
    }


    public get initMethodName(): PropertyKey | undefined {
        return this._initMethodName;
    }


    public set initMethodName(value: PropertyKey | undefined) {
        this._initMethodName = value;
    }


    public get destroyMethodName(): PropertyKey | undefined {
        return this._destroyMethodName;
    }


    public set destroyMethodName(value: PropertyKey | undefined) {
        this._destroyMethodName = value;
    }


    public get factoryUnitName(): string | undefined {
        return this._factoryUnitName;
    }


    public set factoryUnitName(value: string | undefined) {
        this._factoryUnitName = value;
    }


    public get factoryMethodName(): PropertyKey | undefined {
        return this._factoryMethodName;
    }


    public set factoryMethodName(value: PropertyKey | undefined) {
        this._factoryMethodName = value;
    }


    public get postConstructMethodNames(): ReadOnlyCollection<PropertyKey> {
        return this._postConstructMethodNames;
    }


    public constructor(unitClass: Class) {
        super();

        this._unitClass = unitClass;
    }
}
