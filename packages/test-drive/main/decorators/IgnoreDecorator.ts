import {Key} from '@monument/core/main/object-model/attributes/Key';
import {Class} from '@monument/core/main/reflection/Class';
import {Method} from '@monument/core/main/reflection/Method';
import {Decorator} from '@monument/core/main/reflection/Decorator';


export class IgnoreDecorator extends Decorator {
    public static readonly REASON: Key<string> = new Key('Test ignorance reason');

    private readonly _reason: string;


    public constructor(reason: string) {
        super();
        this._reason = reason;
    }


    protected onClass(klass: Class<any>): void {
        klass.decorate(IgnoreDecorator);
        klass.setAttribute(IgnoreDecorator.REASON, this._reason);
    }


    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(IgnoreDecorator);
        method.setAttribute(IgnoreDecorator.REASON, this._reason);
    }
}
