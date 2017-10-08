import {AttributeAccessorSupport} from '../../Language/Reflection/AttributeAccessorSupport';
import {UnitScope} from './UnitScope';
import {Map} from '../../Collections/Map';
import {Type} from '../../Core/Types/Type';
import {Key} from '../../Language/Reflection/Key';
import {Class} from '../../Language/Reflection/Class';
import {IReadOnlyMap} from '../../Collections/Abstraction/IReadOnlyMap';
import {RandomStringGenerator} from '../../Data/Generation/RandomStringGenerator';
import {Assert} from '../../Assertion/Assert';
import {Parameter} from '../../Language/Reflection/Parameter';


export class UnitDefinition<T = any> extends AttributeAccessorSupport {
    public static readonly UNIT_DEFINITION: Key = new Key();


    public static of<T>(type: Type<T>): UnitDefinition<T> {
        const klass: Class<T> = Class.of(type);

        if (klass.hasAttribute(UnitDefinition.UNIT_DEFINITION) === false) {
            const definition: UnitDefinition<any> = new UnitDefinition(type);

            if (klass.superClass != null) {
                definition._parentDefinition = UnitDefinition.of(klass.superClass.type);
            }

            klass.setAttribute(UnitDefinition.UNIT_DEFINITION, definition);
        }

        return klass.getAttribute(UnitDefinition.UNIT_DEFINITION) as UnitDefinition<T>;
    }


    private _parentDefinition: UnitDefinition | undefined;
    private _name: string = RandomStringGenerator.getAlphabeticString(64);
    private _type: Type<T>;
    private _scope: UnitScope = UnitScope.Prototype;
    private _isPrimary: boolean = false;

    private _isInitializing: boolean | undefined;
    private _initMethodName: PropertyKey | undefined;
    private _isUnitFactoryAware: boolean | undefined;
    private _isApplicationContextAware: boolean | undefined;
    private _isUnitNameAware: boolean | undefined;

    private _constructorArguments: Map<number, Parameter<any>> = new Map();
    private _inheritConstructorArguments: boolean = false;
    private _ownPropertyValues: Map<PropertyKey, Type> = new Map();
    private _singletonInstance: T | undefined;


    public get name(): string {
        return this._name;
    }


    public set name(value: string) {
        Assert.argument('value', value).notEmptyString();

        this._name = value;
    }


    public get type(): Type<T> {
        return this._type;
    }


    public get scope(): UnitScope {
        return this._scope;
    }


    public set scope(value: UnitScope) {
        this._scope = value;
    }


    public get constructorArguments(): IReadOnlyMap<number, Parameter<any>> {
        return this._constructorArguments;
    }


    public get ownPropertyValues(): IReadOnlyMap<PropertyKey, Type> {
        return this._ownPropertyValues;
    }


    public get isPrimary(): boolean {
        return this._isPrimary;
    }


    public set isPrimary(value: boolean) {
        this._isPrimary = value;
    }


    public get isSingleton(): boolean {
        return this.scope === UnitScope.Singleton;
    }


    public get isPrototype(): boolean {
        return this.scope === UnitScope.Prototype;
    }


    public get isInitializing(): boolean {
        if (this._isInitializing != null) {
            return this._isInitializing;
        }

        if (this._parentDefinition) {
            return this._parentDefinition.isInitializing;
        }

        return false;
    }


    public set isInitializing(value: boolean) {
        this._isInitializing = value;
    }


    public get isUnitNameAware(): boolean {
        if (this._isUnitNameAware != null) {
            return this._isUnitNameAware;
        }

        if (this._parentDefinition) {
            return this._parentDefinition.isUnitNameAware;
        }

        return false;
    }


    public set isUnitNameAware(value: boolean) {
        this._isUnitNameAware = value;
    }


    public get isUnitFactoryAware(): boolean {
        if (this._isUnitFactoryAware != null) {
            return this._isUnitFactoryAware;
        }

        if (this._parentDefinition) {
            return this._parentDefinition.isUnitFactoryAware;
        }

        return false;
    }


    public set isUnitFactoryAware(value: boolean) {
        this._isUnitFactoryAware = value;
    }


    public get isApplicationContextAware(): boolean {
        if (this._isApplicationContextAware != null) {
            return this._isApplicationContextAware;
        }

        if (this._parentDefinition) {
            return this._parentDefinition.isApplicationContextAware;
        }

        return false;
    }


    public set isApplicationContextAware(value: boolean) {
        this._isApplicationContextAware = value;
    }


    public get singletonInstance(): T | undefined {
        return this._singletonInstance;
    }


    public set singletonInstance(value: T | undefined) {
        this._singletonInstance = value;
    }


    public get initMethodName(): PropertyKey | undefined {
        return this._initMethodName;
    }


    public set initMethodName(value: PropertyKey | undefined) {
        this._initMethodName = value;
    }


    public get inheritConstructorArguments(): boolean {
        return this._inheritConstructorArguments;
    }


    public set inheritConstructorArguments(value: boolean) {
        this._inheritConstructorArguments = value;
    }


    private constructor(type: Type<T>) {
        super();

        this._type = type;
    }


    public setConstructorArgumentType(argumentIndex: number, type: Type): void {
        let parameter: Parameter<any> | undefined = this._constructorArguments.get(argumentIndex);

        if (parameter == null) {
            parameter = new Parameter();

            this._constructorArguments.put(argumentIndex, parameter);
        }

        parameter.type = type;
    }


    public setConstructorArgumentValue(argumentIndex: number, value: any): void {
        let parameter: Parameter<any> | undefined = this._constructorArguments.get(argumentIndex);

        if (parameter == null) {
            parameter = new Parameter();

            this._constructorArguments.put(argumentIndex, parameter);
        }

        parameter.value = value;
    }


    public setPropertyValue(propertyKey: PropertyKey, type: Type): void {
        this._ownPropertyValues.put(propertyKey, type);
    }


    public getOwnAndInheritedPropertyValues(): IReadOnlyMap<PropertyKey, Type> {
        const allProperties: Map<PropertyKey, Type> = this._ownPropertyValues.clone();

        let parentDefinition = this._parentDefinition;

        while (parentDefinition != null) {
            parentDefinition.copyOwnPropertyValuesTo(allProperties);

            parentDefinition = parentDefinition._parentDefinition;
        }

        return allProperties;
    }


    private copyOwnPropertyValuesTo(target: Map<PropertyKey, Type>): void {
        for (let {key, value} of this._ownPropertyValues) {
            target.putIfAbsent(key, value);
        }
    }
}
