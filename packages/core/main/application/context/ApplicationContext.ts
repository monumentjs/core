import {ApplicationUnitDefinitionReader} from './support/ApplicationUnitDefinitionReader';
import {ModuleContext} from './ModuleContext';
import {Context} from '../../context/Context';


export class ApplicationContext extends ModuleContext {

    public constructor(parent?: Context) {
        super(parent);

        this.addUnitDefinitionReader(new ApplicationUnitDefinitionReader(this.unitDefinitionRegistry, this));
    }
}
