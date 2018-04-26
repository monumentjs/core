import {Decorator} from '@monument/reflection/main/Decorator';
import {Class} from '@monument/reflection/main/Class';
import {Parameter} from '@monument/reflection/main/Parameter';
import {Method} from '@monument/reflection/main/Method';
import {DefaultType} from './DefaultType';
import {DefaultTypeConfiguration} from './DefaultTypeConfiguration';


export class DefaultTypeDecorator extends Decorator {
    private readonly _configuration: DefaultTypeConfiguration;


    public constructor(configuration: DefaultTypeConfiguration) {
        super();

        this._configuration = configuration;
    }


    protected onConstructorParameter(klass: Class<any>, parameter: Parameter): void {
        parameter.decorate(DefaultType);
        parameter.setAttribute(DefaultTypeConfiguration.ATTRIBUTE_KEY, this._configuration);
    }


    protected onMethodParameter(klass: Class<any>, method: Method, parameter: Parameter): void {
        parameter.decorate(DefaultType);
        parameter.setAttribute(DefaultTypeConfiguration.ATTRIBUTE_KEY, this._configuration);
    }
}
