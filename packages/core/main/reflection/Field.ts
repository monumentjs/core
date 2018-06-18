import {Type} from '../Type';
import {InvalidArgumentException} from '../exceptions/InvalidArgumentException';
import {ReflectionUtils} from './utils/ReflectionUtils';
import {DefaultHierarchicalAccessibleObject} from './DefaultHierarchicalAccessibleObject';
import {Class} from './Class';
import {GetterFunction, SetterFunction} from './types';


export class Field extends DefaultHierarchicalAccessibleObject {
    private readonly _declaringClass: Class<object>;
    private readonly _name: string | symbol;
    private readonly _getter: GetterFunction | undefined;
    private readonly _setter: SetterFunction | undefined;
    private readonly _isConfigurable: boolean | undefined;
    private readonly _isWritable: boolean | undefined;
    private readonly _isEnumerable: boolean | undefined;


    public get parent(): Field | undefined {
        if (!this.hasParent()) {
            this.setParent(this.getParentField());
        }

        return this.getParent() as Field | undefined;
    }


    public get declaringClass(): Class<object> {
        return this._declaringClass;
    }


    public get name(): string | symbol {
        return this._name;
    }


    public get type(): Type<any> | undefined {
        return ReflectionUtils.getPropertyType(this.declaringClass.type.prototype, this._name);
    }


    public get getter(): GetterFunction | undefined {
        return this._getter;
    }


    public get setter(): SetterFunction | undefined {
        return this._setter;
    }


    public get isConfigurable(): boolean | undefined {
        return this._isConfigurable;
    }


    public get isWritable(): boolean | undefined {
        return this._isWritable;
    }


    public get isEnumerable(): boolean | undefined {
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
        getter?: GetterFunction,
        setter?: SetterFunction,
        isConfigurable?: boolean,
        isWritable?: boolean,
        isEnumerable?: boolean
    ) {
        super();

        if (getter == null && setter == null) {
            throw new InvalidArgumentException('getter/setter', 'Field must have at least getter or setter.');
        }

        this._declaringClass = declaringClass;
        this._name = name;
        this._getter = getter;
        this._setter = setter;
        this._isConfigurable = isConfigurable;
        this._isWritable = isWritable;
        this._isEnumerable = isEnumerable;
    }


    private getParentField(): Field | undefined {
        let klass: Class<object> | undefined = this.declaringClass.parent;

        while (klass != null) {
            if (klass.hasDeclaredField(this.name)) {
                return klass.getDeclaredField(this.name);
            }

            klass = klass.parent;
        }

        return undefined;
    }
}
