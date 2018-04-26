import {ApplicationUnitDefinitionReader} from './support/ApplicationUnitDefinitionReader';
import {ModuleContext} from './ModuleContext';


export class ApplicationContext extends ModuleContext {

    public constructor() {
        super();

        this.addUnitDefinitionReader(new ApplicationUnitDefinitionReader(this.unitDefinitionRegistry, this));
    }
}
