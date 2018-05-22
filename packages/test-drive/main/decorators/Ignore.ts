import {Class} from '@monument/reflection/main/Class';
import {Method} from '@monument/reflection/main/Method';
import {Decorator} from '@monument/reflection/main/Decorator';
import {Key} from '@monument/object-model/main/attributes/Key';


export class IgnoreDecorator extends Decorator {
    public static readonly REASON: Key<string> = new Key();

    private readonly _reason: string;


    public constructor(reason: string) {
        super();
        this._reason = reason;
    }


    protected onClass(klass: Class<any>): void {
        klass.decorate(Ignore);
        klass.setAttribute(IgnoreDecorator.REASON, this._reason);
    }


    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(Ignore);
        method.setAttribute(IgnoreDecorator.REASON, this._reason);
    }
}


export function Ignore(reason: string) {
    return function (...args: any[]) {
        new IgnoreDecorator(reason).apply(args);
    };
}
