import {Type} from '@monument/core/main/Type';
import {ListMap} from '@monument/collections/main/ListMap';
import {ReadOnlyMap} from '../../collections/main/ReadOnlyMap';
import {DefaultHierarchicalAccessibleObject} from './DefaultHierarchicalAccessibleObject';
import {Class} from './Class';
import {Parameter} from './Parameter';
import {ArgumentIndexOutOfBoundsException} from '@monument/core/main/exceptions/ArgumentIndexOutOfBoundsException';


export class Method extends DefaultHierarchicalAccessibleObject {
    private readonly _declaringClass: Class<object>;
    private readonly _name: string | symbol;
    private readonly _callable: Function;
    private readonly _parameters: ListMap<number, Parameter> = new ListMap();
    private readonly _returnType: Type<any> | undefined;
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
        return this._parameters;
    }


    public get returnType(): Type<any> | undefined {
        return this._returnType;
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
        parameterTypes?: Array<Type<any>>,
        returnType?: Type<any>,
        isConfigurable: boolean = false,
        isWritable: boolean = false,
        isEnumerable: boolean = false
    ) {
        super();

        this._declaringClass = declaringClass;
        this._name = name;
        this._callable = callable;
        this._returnType = returnType;
        this._isConfigurable = isConfigurable;
        this._isWritable = isWritable;
        this._isEnumerable = isEnumerable;

        let parametersCount = callable.length;

        if (parameterTypes != null && parameterTypes.length > parametersCount) {
            parametersCount = parameterTypes.length;
        }

        for (let i = 0; i < parametersCount; i++) {
            let parameterType = parameterTypes != null ? parameterTypes[i] : undefined;
            let parameter = new Parameter(i, parameterType);

            this._parameters.put(i, parameter);
        }
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
