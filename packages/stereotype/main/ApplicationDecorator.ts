import {Class} from '@monument/reflection/main/Class';
import {ConfigurationDecorator} from './ConfigurationDecorator';
import {Application} from './Application';
import {ApplicationConfiguration} from './ApplicationConfiguration';


export class ApplicationDecorator extends ConfigurationDecorator {
    private readonly _configuration: ApplicationConfiguration;


    public constructor(configuration: ApplicationConfiguration) {
        super();

        this._configuration = configuration;
    }


    protected onClass(klass: Class<any>): void {
        super.onClass(klass);

        klass.decorate(Application);
        klass.setAttribute(ApplicationConfiguration.ATTRIBUTE_KEY, this._configuration);
    }
}
