import {Type} from '../../Type';
import {ListSet} from '../../collection/ListSet';
import {Set} from '../../collection/Set';


export class UnitDefinition {
    private _isSingleton: boolean = false;
    private _isLazyInit: boolean = false;
    private _isPrimary: boolean = false;
    private _factoryUnitType: Type<object> | undefined;
    private _factoryMethodName: string | symbol | undefined;
    private _dependsOn: ListSet<Type<object>> = new ListSet();


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


    public get dependsOn(): Set<Type<object>> {
        return this._dependsOn;
    }
}
