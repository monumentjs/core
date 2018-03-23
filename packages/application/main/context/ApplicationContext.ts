import {ModuleContext} from './ModuleContext';
import {ApplicationUnitDefinitionReader} from './support/ApplicationUnitDefinitionReader';


export class ApplicationContext extends ModuleContext {

    public constructor() {
        super();

        this.addUnitDefinitionReader(new ApplicationUnitDefinitionReader(this.unitDefinitionRegistry, this));
    }
}
