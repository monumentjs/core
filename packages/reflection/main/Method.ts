import {Type} from '@monument/core/main/Type';
import {ArgumentIndexOutOfBoundsException} from '@monument/core/main/exceptions/ArgumentIndexOutOfBoundsException';
import {ListMap} from '@monument/collections/main/ListMap';
import {ReadOnlyMap} from '@monument/collections/main/ReadOnlyMap';
import {ReflectionUtils} from './utils/ReflectionUtils';
import {DefaultHierarchicalAccessibleObject} from './DefaultHierarchicalAccessibleObject';
import {Class} from './Class';
import {Parameter} from './Parameter';


export class Method extends DefaultHierarchicalAccessibleObject {
    private readonly _declaringClass: Class<object>;
    private readonly _name: string | symbol;
    private readonly _callable: Function;
    private readonly _isConfigurable: boolean;
    private readonly _isWritable: boolean;
    private readonly _isEnumerable: boolean;


    public get parent(): Method | undefined {
        if (!this.hasParent()) {
            this.setParent(this.getParentMethod());
        }

        return this.getParent() as Method | undefined;
    }


    public get declaringClass(): Class<any> {
        return this._declaringClass;
    }


    public get name(): string | symbol {
        return this._name;
    }


    public get callable(): Function {
        return this._callable;
    }


    public get parameters(): ReadOnlyMap<number, Parameter> {
        const parameters: ListMap<number, Parameter> = new ListMap();
        const parameterTypes: Array<Type<any>> = ReflectionUtils.getMethodArgumentTypes(this._declaringClass.type.prototype, this._name);
        let parametersCount: number = this.callable.length;

        if (parameterTypes != null && parameterTypes.length > parametersCount) {
            parametersCount = parameterTypes.length;
        }

        for (let i = 0; i < parametersCount; i++) {
            let parameterType = parameterTypes != null ? parameterTypes[i] : undefined;
            let parameter = new Parameter(i, parameterType);

            parameters.put(i, parameter);
        }

        return parameters;
    }


    public get returnType(): Type<any> | undefined {
        return ReflectionUtils.getMethodReturnType(this.declaringClass.type.prototype, this._name);
    }


    public get isConfigurable(): boolean {
        return this._isConfigurable;
    }


    public get isWritable(): boolean {
        return this._isWritable;
    }


    public get isEnumerable(): boolean {
        return this._isEnumerable;
    }


    public get isDeclared(): boolean {
        if (this.declaringClass.prototype == null) {
            return false;
        }

        return this.declaringClass.prototype.hasOwnProperty(this.name);
    }


    public constructor(
        declaringClass: Class<object>,
        name: string | symbol,
        callable: Function,
        isConfigurable: boolean = false,
        isWritable: boolean = false,
        isEnumerable: boolean = false
    ) {
        super();

        this._declaringClass = declaringClass;
        this._name = name;
        this._callable = callable;
        this._isConfigurable = isConfigurable;
        this._isWritable = isWritable;
        this._isEnumerable = isEnumerable;
    }


    public invoke(self: object, args: any[]): any {
        return this._callable.apply(self, args);
    }


    public getParameterAt(index: number): Parameter {
        let parameter = this.parameters.get(index);

        if (parameter == null) {
            throw new ArgumentIndexOutOfBoundsException('index', index, 0, this.parameters.length);
        }

        return parameter;
    }


    private getParentMethod(): Method | undefined {
        let klass: Class<object> | undefined = this.declaringClass.parent;

        while (klass != null) {
            if (klass.hasDeclaredMethod(this.name)) {
                return klass.getDeclaredMethod(this.name);
            }

            klass = klass.parent;
        }

        return undefined;
    }
}
