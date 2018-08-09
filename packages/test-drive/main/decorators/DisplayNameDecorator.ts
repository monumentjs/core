import {Decorator} from '@monument/core/main/reflection/Decorator';
import {Key} from '@monument/core/main/object-model/attributes/Key';
import {Class} from '@monument/core/main/reflection/Class';
import {Method} from '@monument/core/main/reflection/Method';


export class DisplayNameDecorator extends Decorator {
    public static readonly NAME: Key<string> = new Key('Test display name');

    private readonly _name: string;


    public constructor(name: string) {
        super();

        this._name = name;
    }


    protected onClass(klass: Class<any>): void {
        klass.decorate(DisplayNameDecorator);
        klass.setAttribute(DisplayNameDecorator.NAME, this._name);
    }


    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(DisplayNameDecorator);
        method.setAttribute(DisplayNameDecorator.NAME, this._name);
    }
}
