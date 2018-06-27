import {Invokable} from '@monument/core/main/reflection/Invokable';
import {Method} from '@monument/core/main/reflection/Method';
import {ReadOnlyList} from '@monument/core/main/collections/ReadOnlyList';
import {Parameter} from '@monument/core/main/reflection/Parameter';
import {Ignore} from '../decorators/Ignore';
import {Ignorable} from './Ignorable';
import {IgnoreDecorator} from '../decorators/IgnoreDecorator';
import {DisplayName} from '../decorators/DisplayName';
import {DisplayNameDecorator} from '../decorators/DisplayNameDecorator';


export abstract class TestMethod implements Invokable, Ignorable {
    private readonly _displayName: string;
    protected readonly method: Method;


    public get isIgnored(): boolean {
        return this.method.isDecoratedWith(Ignore);
    }


    public get displayName(): string {
        return this._displayName;
    }


    public get reasonOfIgnore(): string | undefined {
        return this.method.getAttribute(IgnoreDecorator.REASON);
    }


    public get parameters(): ReadOnlyList<Parameter> {
        return this.method.parameters;
    }


    public constructor(method: Method) {
        this.method = method;
        this._displayName = method.name.toString();

        if (method.isDecoratedWith(DisplayName)) {
            const displayName: string | undefined = method.getAttribute(DisplayNameDecorator.NAME);

            if (displayName) {
                this._displayName = displayName;
            }
        }
    }


    public invoke(self: object, args: any[]): any {
        return this.method.invoke(self, args);
    }
}
