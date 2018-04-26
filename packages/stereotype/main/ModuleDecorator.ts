import {Class} from '@monument/reflection/main/Class';
import {ConfigurationDecorator} from './ConfigurationDecorator';
import {Module} from './Module';
import {ModuleConfiguration} from './ModuleConfiguration';


export class ModuleDecorator extends ConfigurationDecorator {
    private readonly _configuration: ModuleConfiguration;


    public constructor(configuration: ModuleConfiguration) {
        super();

        this._configuration = configuration;
    }


    protected onClass(klass: Class<any>): void {
        super.onClass(klass);

        klass.decorate(Module);
        klass.setAttribute(ModuleConfiguration.ATTRIBUTE_KEY, this._configuration);
    }
}
