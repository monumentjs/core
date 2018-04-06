import {ApplicationContextAwareUnitPostProcessor} from './configuration/ApplicationContextAwareUnitPostProcessor';
import {ApplicationUnitDefinitionReader} from './support/ApplicationUnitDefinitionReader';
import {ModuleContext} from './ModuleContext';


export class ApplicationContext extends ModuleContext {

    public constructor() {
        super();

        this.addUnitPostProcessor(new ApplicationContextAwareUnitPostProcessor(this));

        this.addUnitDefinitionReader(new ApplicationUnitDefinitionReader(this.unitDefinitionRegistry, this));
    }
}
