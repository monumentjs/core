import {Type} from '@monument/core/main/Type';
import {ListSet} from '@monument/collections/main/ListSet';
import {Set} from '../../../../collections/main/Set';


export class UnitDefinition {
    private _postConstructMethodNames: Set<string | symbol> = new ListSet();
    private _preDestroyMethodNames: Set<string | symbol> = new ListSet();
    private _initMethodName: string | symbol | undefined;
    private _destroyMethodName: string | symbol | undefined;
    private _isSingleton: boolean = false;
    private _isLazyInit: boolean = false;
    private _isPrimary: boolean = false;
    private _factoryUnitType: Type<object> | undefined;
    private _factoryMethodName: string | symbol | undefined;
    private _qualifier: string | undefined;


    public get postConstructMethodNames(): Set<string | symbol> {
        return this._postConstructMethodNames;
    }


    public get preDestroyMethodNames(): Set<string | symbol> {
        return this._preDestroyMethodNames;
    }


    public get initMethodName(): string | symbol | undefined {
        return this._initMethodName;
    }


    public set initMethodName(value: string | symbol | undefined) {
        this._initMethodName = value;
    }


    public get destroyMethodName(): string | symbol | undefined {
        return this._destroyMethodName;
    }


    public set destroyMethodName(value: string | symbol | undefined) {
        this._destroyMethodName = value;
    }


    public get isSingleton(): boolean {
        return this._isSingleton;
    }


    public set isSingleton(value: boolean) {
        this._isSingleton = value;
    }


    public get isLazyInit(): boolean {
        return this._isLazyInit;
    }


    public set isLazyInit(value: boolean) {
        this._isLazyInit = value;
    }


    public get isPrimary(): boolean {
        return this._isPrimary;
    }


    public set isPrimary(value: boolean) {
        this._isPrimary = value;
    }


    public get qualifier(): string | undefined {
        return this._qualifier;
    }


    public set qualifier(value: string | undefined) {
        this._qualifier = value;
    }


    public get factoryUnitType(): Type<object> | undefined {
        return this._factoryUnitType;
    }


    public set factoryUnitType(value: Type<object> | undefined) {
        this._factoryUnitType = value;
    }


    public get factoryMethodName(): string | symbol | undefined {
        return this._factoryMethodName;
    }


    public set factoryMethodName(value: string | symbol | undefined) {
        this._factoryMethodName = value;
    }

}
