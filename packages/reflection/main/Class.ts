import {Type} from '@monument/core/main/Type';
import {ArgumentIndexOutOfBoundsException} from '@monument/core/main/exceptions/ArgumentIndexOutOfBoundsException';
import {Map} from '@monument/collections/main/Map';
import {ReadOnlyCollection} from '@monument/collections/main/ReadOnlyCollection';
import {Set} from '@monument/collections/main/Set';
import {ReadOnlyMap} from '@monument/collections/main/ReadOnlyMap';
import {ListMap} from '@monument/collections/main/ListMap';
import {ListSet} from '@monument/collections/main/ListSet';
import {DefaultHierarchicalAccessibleObject} from './DefaultHierarchicalAccessibleObject';
import {ReflectionUtils} from './utils/ReflectionUtils';
import {NoSuchFieldException} from './NoSuchFieldException';
import {NoSuchMethodException} from './NoSuchMethodException';
import {Field} from './Field';
import {Method} from './Method';
import {Parameter} from './Parameter';


export class Class<T extends object> extends DefaultHierarchicalAccessibleObject {
    private static readonly CLASS_REFLECTION_PROPERTY_KEY: symbol = Symbol();
    private static readonly CONSTRUCTOR_PROPERTY_NAME: string = 'constructor';


    public static of<T extends object>(type: Type<T> | Function): Class<T> {
        if (type.hasOwnProperty(this.CLASS_REFLECTION_PROPERTY_KEY) === false) {
            (type as any)[this.CLASS_REFLECTION_PROPERTY_KEY] = new Class(type);
        }

        return (type as any)[this.CLASS_REFLECTION_PROPERTY_KEY];
    }


    private readonly _type: Type<T>;
    private readonly _declaredFields: ReadOnlyMap<string | symbol, Field>;
    private readonly _declaredMethods: ReadOnlyMap<string | symbol, Method>;


    public get parent(): Class<any> | undefined {
        if (!this.hasParent()) {
            this.setParent(this.getSuperClass());
        }

        return this.getParent() as Class<any> | undefined;
    }


    public get type(): Type<T> {
        return this._type;
    }


    public get prototype(): object | undefined {
        return this.type.prototype;
    }


    public get name(): string {
        return this.type.name;
    }


    public get constructorParameters(): ReadOnlyMap<number, Parameter> {
        let parameters: ListMap<number, Parameter> = new ListMap();
        let parameterTypes: Array<Type<any>> = ReflectionUtils.getConstructorParameterTypes(this.type);
        let parametersCount = this.type.length;

        if (parametersCount < parameterTypes.length) {
            parametersCount = parameterTypes.length;
        }

        for (let i = 0; i < parametersCount; i++) {
            let type: Type<any> | undefined = parameterTypes != null ? parameterTypes[i] : undefined;
            let parameter = new Parameter(i, type);

            parameters.put(i, parameter);
        }

        return parameters;
    }


    public get fields(): ReadOnlyCollection<Field> {
        let fields: Set<Field> = new ListSet();
        let klass: Class<any> | undefined = this;

        while (klass != null) {
            fields.addAll(klass.declaredFields);

            klass = klass.parent;
        }

        return fields;
    }


    public get declaredFields(): ReadOnlyCollection<Field> {
        return this._declaredFields.values;
    }


    public get declaredFieldKeys(): ReadOnlyCollection<string | symbol> {
        return this._declaredFields.keys;
    }


    public get methods(): ReadOnlyCollection<Method> {
        let methods: Set<Method> = new ListSet();
        let klass: Class<any> | undefined = this;

        while (klass != null) {
            methods.addAll(klass.declaredMethods);

            klass = klass.parent;
        }

        return methods;
    }


    public get declaredMethods(): ReadOnlyCollection<Method> {
        return this._declaredMethods.values;
    }


    public get declaredMethodKeys(): ReadOnlyCollection<string | symbol> {
        return this._declaredMethods.keys;
    }


    private constructor(type: Type<T> | Function) {
        super();

        this._type = type as Type<T>;
        this._declaredFields = this.getDeclaredFields();
        this._declaredMethods = this.getDeclaredMethods();
    }


    /**
     * Returns own or inherited field.
     * @throws {NoSuchFieldException} If property not found.
     */
    public getField(key: string | symbol): Field {
        let klass: Class<any> | undefined = this;
        let field: Field | undefined;

        while (klass != null) {
            field = klass._declaredFields.get(key);

            if (field != null) {
                break;
            }

            klass = klass.parent;
        }

        if (field == null) {
            throw new NoSuchFieldException(key);
        }

        return field;
    }


    public hasField(key: string | symbol): boolean {
        let klass: Class<any> | undefined = this;

        while (klass != null) {
            if (klass.hasDeclaredField(key)) {
                return true;
            }

            klass = klass.parent;
        }

        return false;
    }


    /**
     * @throws {NoSuchFieldException} If property not found.
     */
    public getDeclaredField(key: string | symbol): Field {
        let value: Field | undefined = this._declaredFields.get(key);

        if (value == null) {
            throw new NoSuchFieldException(key);
        }

        return value;
    }


    public hasDeclaredField(key: string | symbol): boolean {
        return this._declaredFields.containsKey(key);
    }


    /**
     * Returns own or inherited method.
     * @throws {NoSuchMethodException} If method not found.
     */
    public getMethod(key: string | symbol): Method {
        let klass: Class<any> | undefined = this;
        let method: Method | undefined;

        while (klass != null) {
            method = klass._declaredMethods.get(key);

            if (method != null) {
                break;
            }

            klass = klass.parent;
        }

        if (method == null) {
            throw new NoSuchMethodException(key);
        }

        return method;
    }


    public hasMethod(key: string | symbol): boolean {
        let klass: Class<any> | undefined = this;

        while (klass != null) {
            if (klass.hasDeclaredMethod(key)) {
                return true;
            }

            klass = klass.parent;
        }

        return false;
    }


    /**
     * @throws {NoSuchMethodException} If method not found.
     */
    public getDeclaredMethod(key: string | symbol): Method {
        let value: Method | undefined = this._declaredMethods.get(key);

        if (value == null) {
            throw new NoSuchMethodException(key);
        }

        return value;
    }


    public hasDeclaredMethod(key: string | symbol): boolean {
        return this._declaredMethods.containsKey(key);
    }


    public getParameterAt(index: number): Parameter {
        let parameter = this.constructorParameters.get(index);

        if (parameter == null) {
            throw new ArgumentIndexOutOfBoundsException('index', index, 0, this.constructorParameters.length);
        }

        return parameter;
    }


    public instantiate(...args: any[]): T {
        return new this._type(...args);
    }


    public isSubClassOf(baseClass: Class<any>): boolean {
        let parent: Class<any> | undefined = this.parent;

        while (parent != null) {
            if (parent === baseClass) {
                return true;
            }

            parent = parent.parent;
        }

        return false;
    }


    public isSuperClassOf(derivedClass: Class<any>): boolean {
        let parent: Class<any> | undefined = derivedClass.parent;

        while (parent != null) {
            if (parent === this) {
                return true;
            }

            parent = parent.parent;
        }

        return false;
    }


    private getDeclaredFields(): Map<string | symbol, Field> {
        let fields: Map<string | symbol, Field> = new ListMap();

        if (this.prototype != null) {
            let propertyDescriptors = Object.getOwnPropertyDescriptors(this.prototype);
            let propertyNames = Object.getOwnPropertyNames(this.prototype);

            for (let propertyName of propertyNames) {
                if (propertyName === Class.CONSTRUCTOR_PROPERTY_NAME) {
                    continue;
                }

                let descriptor = propertyDescriptors[propertyName];

                if (this.isFieldDescriptor(descriptor)) {
                    fields.put(propertyName, new Field(
                        this,
                        propertyName,
                        descriptor.get,
                        descriptor.set,
                        descriptor.configurable,
                        descriptor.writable,
                        descriptor.enumerable
                    ));
                }
            }
        }

        return fields;
    }


    private getDeclaredMethods(): Map<string | symbol, Method> {
        let methods: Map<string | symbol, Method> = new ListMap();

        if (this.prototype != null) {
            let propertyDescriptors = Object.getOwnPropertyDescriptors(this.prototype);
            let propertyNames = Object.getOwnPropertyNames(this.prototype);

            for (let propertyName of propertyNames) {
                if (propertyName === Class.CONSTRUCTOR_PROPERTY_NAME) {
                    continue;
                }

                let descriptor = propertyDescriptors[propertyName];

                if (this.isMethodDescriptor(descriptor)) {
                    methods.put(propertyName, new Method(
                        this,
                        propertyName,
                        descriptor.value as Function,
                        descriptor.configurable,
                        descriptor.writable,
                        descriptor.enumerable
                    ));
                }
            }
        }

        return methods;
    }


    private getSuperClass(): Class<any> | undefined {
        let parentConstructor: Function | undefined;
        let parentPrototype: object | undefined;

        if (this.type !== Object as Type<Object>) {
            parentPrototype = Object.getPrototypeOf(this.type.prototype);
            parentConstructor = parentPrototype ? parentPrototype.constructor : undefined;

            if (parentConstructor != null) {
                return Class.of(parentConstructor);
            }
        }

        return undefined;
    }


    private isFieldDescriptor(descriptor: TypedPropertyDescriptor<any>): boolean {
        return descriptor.get != null || descriptor.set != null;
    }


    private isMethodDescriptor(descriptor: TypedPropertyDescriptor<any>): boolean {
        return typeof descriptor.value === 'function';
    }
}
