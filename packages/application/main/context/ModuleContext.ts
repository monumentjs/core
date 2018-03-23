import {DefaultContext} from '@monument/ioc/main/context/support/DefaultContext';
import {ModuleUnitDefinitionReader} from './support/ModuleUnitDefinitionReader';


export class ModuleContext extends DefaultContext {

    public constructor() {
        super();

        this.addUnitDefinitionReader(new ModuleUnitDefinitionReader(this.unitDefinitionRegistry, this));
    }
}
