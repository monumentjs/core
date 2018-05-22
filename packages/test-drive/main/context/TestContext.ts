import {Type} from '@monument/core/main/Type';
import {Context} from '@monument/context/main/context/Context';
import {DefaultContext} from '@monument/context/main/context/support/DefaultContext';
import {MethodInvoker} from '@monument/context/main/unit/factory/support/MethodInvoker';
import {UnitRequest} from '@monument/context/main/unit/factory/UnitRequest';
import {Method} from '@monument/reflection/main/Method';


export class TestContext extends DefaultContext {
    private readonly _invoker: MethodInvoker;

    public readonly testConstructor: Type<object>;


    public constructor(parent: Context | undefined, testConstructor: Type<object>) {
        super(parent, testConstructor);

        this.testConstructor = testConstructor;
        this._invoker = new MethodInvoker(this);
    }


    public invoke(request: UnitRequest<object>, self: object, method: Method): Promise<any> {
        return this._invoker.invoke(request, self, method);
    }
}
