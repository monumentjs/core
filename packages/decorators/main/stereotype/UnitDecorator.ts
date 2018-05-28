import {Type} from '@monument/core/main/Type';
import {Decorator} from '@monument/reflection/main/Decorator';
import {Class} from '@monument/reflection/main/Class';
import {Method} from '@monument/reflection/main/Method';
import {Key} from '@monument/object-model/main/attributes/Key';
import {Unit} from './Unit';


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
