import {DefaultContext} from '../../context/support/DefaultContext';
import {ModuleUnitDefinitionReader} from './support/ModuleUnitDefinitionReader';
import {Context} from '../../context/Context';


export class ModuleContext extends DefaultContext {

    public constructor(parent?: Context) {
        super(parent);

        this.addUnitDefinitionReader(new ModuleUnitDefinitionReader(this.unitDefinitionRegistry, this));
    }
}
