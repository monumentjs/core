import {Type} from '../Type';
import {ReflectionUtils} from './utils/ReflectionUtils';
import {DefaultHierarchicalAccessibleObject} from './DefaultHierarchicalAccessibleObject';
import {Class} from './Class';
import {Parameter} from './Parameter';
import {Invokable} from './Invokable';
import {ReadOnlyList} from '../collections/ReadOnlyList';
import {ArrayList} from '../collections/ArrayList';


export class Method extends DefaultHierarchicalAccessibleObject implements Invokable {
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


    public get parameters(): ReadOnlyList<Parameter> {
        const parameters: ArrayList<Parameter> = new ArrayList();
        const parameterTypes: Array<Type<any>> = ReflectionUtils.getMethodArgumentTypes(this._declaringClass.type.prototype, this._name);
        const requiredParametersCount: number = this.callable.length;
        const maxParametersCount = Math.max(requiredParametersCount, parameterTypes.length);

        for (let i = 0; i < maxParametersCount; i++) {
            const parameterType: Type<object> | undefined = parameterTypes != null ? parameterTypes[i] : undefined;
            const isOptional: boolean = i > requiredParametersCount;
            const parameter: Parameter = new Parameter(parameterType, isOptional);

            parameters.add(parameter);
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
        return this.parameters.getAt(index);
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
