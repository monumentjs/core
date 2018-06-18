import {Invokable} from '@monument/core/main/reflection/Invokable';
import {Method} from '@monument/core/main/reflection/Method';
import {ReadOnlyList} from '@monument/core/main/collections/ReadOnlyList';
import {Parameter} from '@monument/core/main/reflection/Parameter';
import {Ignore} from '../decorators/Ignore';
import {Ignorable} from './Ignorable';
import {IgnoreDecorator} from '../decorators/IgnoreDecorator';


export abstract class TestMethod implements Invokable, Ignorable {
    protected readonly method: Method;


    public get isIgnored(): boolean {
        return this.method.isDecoratedWith(Ignore);
    }


    public get reasonOfIgnore(): string | undefined {
        return this.method.getAttribute(IgnoreDecorator.REASON);
    }


    public get parameters(): ReadOnlyList<Parameter> {
        return this.method.parameters;
    }


    public constructor(method: Method) {
        this.method = method;
    }


    public invoke(self: object, args: any[]): any {
        return this.method.invoke(self, args);
    }
}
