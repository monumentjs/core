import {Class} from './Class';
import {Key} from './Key';
import {AccessibleObject} from './AccessibleObject';
import {Exception} from '../../Exceptions/Exception';


export type GetterFunction<T> = () => T;
export type SetterFunction<T> = (value: T) => void;


export class Property<T = any> extends AccessibleObject {
    public static readonly PROPERTY_ATTRIBUTES_MAPPING: Key = new Key();


    public static of<T>(
        declaringClass: Class,
        key: PropertyKey,
        isStatic: boolean
    ): Property<T> {
        let property: Property<T>;
        let descriptor: TypedPropertyDescriptor<T> | undefined;

        if (isStatic) {
            if (declaringClass.hasOwnStaticProperty(key)) {
                return declaringClass.getOwnStaticProperty(key);
            } else {
                descriptor = Object.getOwnPropertyDescriptor(declaringClass.type, key);
            }
        } else {
            if (declaringClass.hasOwnInstanceProperty(key)) {
                return declaringClass.getOwnInstanceProperty(key);
            } else {
                descriptor = Object.getOwnPropertyDescriptor(declaringClass.prototype, key);
            }
        }

        if (descriptor == null) {
            descriptor = {
                value: undefined
            };
        }

        property = new Property(declaringClass, key, descriptor, isStatic);

        if (isStatic) {
            declaringClass.addOwnStaticProperty(property);
        } else {
            declaringClass.addOwnInstanceProperty(property);
        }

        return property;
    }


    private _declaringClass: Class;
    private _key: PropertyKey;
    private _descriptor: TypedPropertyDescriptor<T>;
    private _isStatic: boolean;


    public get key(): PropertyKey {
        return this._key;
    }


    public get declaringClass(): Class {
        return this._declaringClass;
    }


    public get isWritable(): boolean {
        return this._descriptor.writable || false;
    }


    // public set isWritable(value: boolean) {
    //     this._descriptor.writable = value;
    // }


    public get isEnumerable(): boolean {
        return this._descriptor.enumerable || false;
    }


    // public set isEnumerable(value: boolean) {
    //     this._descriptor.enumerable = value;
    // }


    public get isConfigurable(): boolean {
        return this._descriptor.configurable || false;
    }


    // public set isConfigurable(value: boolean) {
    //     this._descriptor.configurable = value;
    // }


    public get getter(): GetterFunction<T> | undefined {
        return this._descriptor.get;
    }


    // public set getter(value: GetterFunction<T> | undefined) {
    //     this._descriptor.get = value;
    // }


    public get setter(): SetterFunction<T> | undefined {
        return this._descriptor.set;
    }


    // public set setter(value: SetterFunction<T> | undefined) {
    //     this._descriptor.set = value;
    // }


    public get isAccessor(): boolean {
        return this.getter != null || this.setter != null;
    }


    public get isStatic(): boolean {
        return this._isStatic;
    }


    public get isVirtual(): boolean {
        if (this.isStatic) {
            return this.declaringClass.type.hasOwnProperty(this.key);
        } else {
            if (this.declaringClass.prototype != null) {
                return this.declaringClass.prototype.hasOwnProperty(this.key);
            }
        }

        return false;
    }


    private constructor(
        declaringClass: Class,
        key: PropertyKey,
        descriptor: TypedPropertyDescriptor<T>,
        isStatic: boolean
    ) {
        super();

        this._declaringClass = declaringClass;
        this._key = key;
        this._isStatic = isStatic;
        this._descriptor = descriptor;
    }


    public declare(): void {
        if (this._isStatic) {
            Object.defineProperty(this.declaringClass.type, this.key, this._descriptor);
        } else {
            if (this.declaringClass.prototype != null) {
                Object.defineProperty(this.declaringClass.prototype, this.key, this._descriptor);
            } else {
                throw new Exception(`Class does not have a prototype.`);
            }
        }
    }


    // Attribute Support


    public getOwnOrInheritedAttribute<TValue>(key: Key): TValue | undefined {
        if (this.hasAttribute(key)) {
            return this.getAttribute(key);
        }

        const superClass: Class | undefined = this.declaringClass.superClass;

        if (superClass != null && superClass.hasOwnProperty(this.key)) {
            const property: Property = superClass.getOwnInstanceProperty(this.key);

            return property.getOwnOrInheritedAttribute(key);
        }

        return undefined;
    }


    public hasOwnOrInheritedAttribute(key: Key): boolean {
        if (this.hasAttribute(key)) {
            return true;
        }

        const superClass: Class | undefined = this.declaringClass.superClass;

        if (superClass != null && superClass.hasOwnProperty(this.key)) {
            const property: Property = superClass.getOwnInstanceProperty(this.key);

            return property.hasOwnOrInheritedAttribute(key);
        }

        return false;
    }


    public removeOwnOrInheritedAttribute(key: Key): T | undefined {
        if (this.hasAttribute(key)) {
            return this.removeAttribute(key);
        }

        const superClass: Class | undefined = this.declaringClass.superClass;

        if (superClass != null && superClass.hasOwnProperty(this.key)) {
            const property: Property = superClass.getOwnInstanceProperty(this.key);

            return property.removeOwnOrInheritedAttribute(key);
        }

        return undefined;
    }


    public removeAllOwnAndInheritedAttributes(): void {
        this.removeAllAttributes();

        const superClass: Class | undefined = this.declaringClass.superClass;

        if (superClass != null && superClass.hasOwnProperty(this.key)) {
            const property: Property = superClass.getOwnInstanceProperty(this.key);

            property.removeAllOwnAndInheritedAttributes();
        }
    }
}
