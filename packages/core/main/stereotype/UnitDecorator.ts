import {Unit} from './Unit';
import {Decorator} from '../reflection/Decorator';
import {Key} from '../object-model/attributes/Key';
import {Type} from '../Type';
import {Class} from '../reflection/Class';
import {Method} from '../reflection/Method';


export class UnitDecorator extends Decorator {
    public static readonly TYPE: Key<Type<object>> = new Key();

    private readonly _type: Type<object>;


    public constructor(type: Type<object>) {
        super();

        this._type = type;
    }


    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(Unit);
        method.setAttribute(UnitDecorator.TYPE, this._type);
    }
}
