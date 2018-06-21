import {TestContextConfigurationUnitDefinitionReader} from './support/TestContextConfigurationUnitDefinitionReader';
import {ApplicationContext} from '@monument/core/main/application/context/ApplicationContext';
import {Context} from '@monument/core/main/context/Context';


export class TestClassContext extends ApplicationContext {

    public constructor(parent: Context) {
        super(parent);

        this.addUnitDefinitionReader(
            new TestContextConfigurationUnitDefinitionReader(this.unitDefinitionRegistry, this)
        );
    }
}
