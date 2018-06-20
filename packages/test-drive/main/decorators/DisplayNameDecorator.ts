import {Decorator} from '@monument/core/main/reflection/Decorator';
import {Key} from '@monument/core/main/object-model/attributes/Key';
import {Class} from '@monument/core/main/reflection/Class';
import {DisplayName} from './DisplayName';


export class DisplayNameDecorator extends Decorator {
    public static readonly NAME: Key<string> = new Key();

    private readonly _name: string;


    public constructor(name: string) {
        super();

        this._name = name;
    }


    protected onClass(klass: Class<any>): void {
        klass.decorate(DisplayName);
        klass.setAttribute(DisplayNameDecorator.NAME, this._name);
    }
}
