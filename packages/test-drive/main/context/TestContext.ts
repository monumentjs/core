import {Context} from '@monument/context/main/context/Context';
import {DefaultContext} from '@monument/context/main/context/support/DefaultContext';
import {MethodInvoker} from '@monument/context/main/unit/factory/support/MethodInvoker';
import {UnitRequest} from '@monument/context/main/unit/factory/UnitRequest';
import {Method} from '@monument/reflection/main/Method';
import {TestConfigurationUnitDefinitionReader} from './support/TestConfigurationUnitDefinitionReader';


export class TestContext extends DefaultContext {
    private readonly _invoker: MethodInvoker;


    public constructor(parent?: Context) {
        super(parent);

        this.addUnitDefinitionReader(
            new TestConfigurationUnitDefinitionReader(this.unitDefinitionRegistry, this)
        );

        this._invoker = new MethodInvoker(this);
    }


    public invoke(request: UnitRequest<object>, self: object, method: Method): Promise<any> {
        return this._invoker.invoke(request, self, method);
    }
}
