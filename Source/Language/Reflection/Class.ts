import {Type} from '../../Core/Types/Type';
import {Property} from './Property';
import {PropertyMap} from './PropertyMap';
import {Key} from './Key';
import {AccessibleObject} from './AccessibleObject';
import {NoSuchPropertyException} from './NoSuchPropertyException';
import {IReadOnlyMap} from '../../Collections/Abstraction/IReadOnlyMap';


export class Class<T = any> extends AccessibleObject {
    protected static readonly CLASS_REFLECTION: symbol = Symbol();


    public static of<T>(type: Type<T>): Class<T> {
        if (type.hasOwnProperty(this.CLASS_REFLECTION) === false) {
            (type as any)[this.CLASS_REFLECTION] = new Class(type);
        }

        return (type as any)[this.CLASS_REFLECTION];
    }


    private readonly _type: Type<T>;
    private readonly _ownInstanceProperties: PropertyMap = new PropertyMap();
    private readonly _ownStaticProperties: PropertyMap = new PropertyMap();

    private _superClass: Class | undefined;
    private _isSuperClassResolved: boolean = false;


    public get type(): Type<T> {
        return this._type;
    }

    
    public get name(): string {
        return this.type.name;
    }

    
    public get constructorArgumentsCount(): number {
        return this.type.length;
    }


    public get prototype(): object | undefined {
        return this.type.prototype;
    }


    public get superClass(): Class | undefined {
        if (this.type === Object as Type) {
            return undefined;
        }

        if (!this._isSuperClassResolved) {
            const parentPrototype = Object.getPrototypeOf(this.prototype);
            const superClass: Type | undefined = parentPrototype ? parentPrototype.constructor : undefined;

            this._superClass = superClass ? Class.of(superClass) : undefined;

            this._isSuperClassResolved = true;
        }

        return this._superClass;
    }


    public get hasSuperClass(): boolean {
        return this.superClass != null;
    }


    public get ownInstanceProperties(): IReadOnlyMap<PropertyKey, Property> {
        return this._ownInstanceProperties;
    }


    public get ownStaticProperties(): IReadOnlyMap<PropertyKey, Property> {
        return this._ownStaticProperties;
    }


    private constructor(type: Type<T>) {
        super();

        this._type = type;
        this.readOwnInstanceProperties();
        this.readOwnStaticProperties();
    }


    // Instance properties


    public addOwnInstanceProperty(property: Property): void {
        this._ownInstanceProperties.put(property.key, property);
    }


    public hasOwnInstanceProperty(key: PropertyKey): boolean {
        return this._ownInstanceProperties.containsKey(key);
    }

    /**
     * @throws {NoSuchPropertyException} If property not found.
     */
    public getOwnInstanceProperty(key: PropertyKey): Property {
        const property: Property | undefined = this._ownInstanceProperties.get(key);

        if (property == null) {
            throw new NoSuchPropertyException(key);
        }

        return property;
    }


    public getOwnAndInheritedInstanceProperties(): IReadOnlyMap<PropertyKey, Property> {
        const properties: PropertyMap = this._ownInstanceProperties.clone();
        let superClass: Class | undefined = this.superClass;

        while (superClass != null) {
            superClass.copyOwnInstancePropertiesTo(properties);
            superClass = superClass.superClass;
        }

        return properties;
    }


    // Static properties


    public addOwnStaticProperty(property: Property): void {
        this._ownStaticProperties.put(property.key, property);
    }


    public hasOwnStaticProperty(key: PropertyKey): boolean {
        return this._ownStaticProperties.containsKey(key);
    }

    /**
     * @throws NoSuchPropertyException If property not found.
     */
    public getOwnStaticProperty(key: PropertyKey): Property {
        const property: Property | undefined = this._ownStaticProperties.get(key);

        if (property == null) {
            throw new NoSuchPropertyException(key);
        }

        return property;
    }


    public getOwnAndInheritedStaticProperties(): IReadOnlyMap<PropertyKey, Property> {
        const properties: PropertyMap = this._ownStaticProperties.clone();
        let superClass: Class | undefined = this.superClass;

        while (superClass != null) {
            superClass.copyOwnStaticPropertiesTo(properties);
            superClass = superClass.superClass;
        }

        return properties;
    }


    // Attribute Support


    public getOwnOrInheritedAttribute<TValue>(key: Key): TValue | undefined {
        if (this.hasAttribute(key)) {
            return this.getAttribute(key);
        }

        if (this.superClass != null) {
            return this.superClass.getOwnOrInheritedAttribute(key);
        }

        return undefined;
    }


    public hasOwnOrInheritedAttribute(key: Key): boolean {
        if (this.hasAttribute(key)) {
            return true;
        }

        if (this.superClass != null) {
            return this.superClass.hasOwnOrInheritedAttribute(key);
        }

        return false;
    }


    public removeOwnOrInheritedAttribute(key: Key): T | undefined {
        if (this.hasAttribute(key)) {
            return this.removeAttribute(key);
        }

        if (this.superClass != null) {
            return this.superClass.removeOwnOrInheritedAttribute(key);
        }

        return undefined;
    }


    public removeAllOwnAndInheritedAttributes(): void {
        this.removeAllAttributes();

        if (this.superClass != null) {
            this.superClass.removeAllOwnAndInheritedAttributes();
        }
    }


    private readOwnInstanceProperties(): void {
        if (this.prototype) {
            const propertyNames: string[] = Object.getOwnPropertyNames(this.prototype);

            for (let key of propertyNames) {
                this._ownInstanceProperties.put(key, Property.of(this, key, false));
            }
        }
    }


    private readOwnStaticProperties(): void {
        const propertyNames: string[] = Object.getOwnPropertyNames(this.type);

        for (let key of propertyNames) {
            this._ownStaticProperties.put(key, Property.of(this, key, true));
        }
    }


    private copyOwnInstancePropertiesTo(map: PropertyMap): void {
        for (let {key, value} of this._ownInstanceProperties) {
            map.putIfAbsent(key, value);
        }
    }


    private copyOwnStaticPropertiesTo(map: PropertyMap): void {
        for (let {key, value} of this._ownStaticProperties) {
            map.putIfAbsent(key, value);
        }
    }
}
