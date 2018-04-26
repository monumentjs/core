import {Decorator} from '@monument/reflection/main/Decorator';
import {Class} from '@monument/reflection/main/Class';
import {Method} from '@monument/reflection/main/Method';
import {Unit} from './Unit';
import {UnitConfiguration} from './UnitConfiguration';


export class UnitDecorator extends Decorator {
    private readonly _configuration: UnitConfiguration;


    public constructor(configuration: UnitConfiguration) {
        super();

        this._configuration = configuration;
    }


    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(Unit);
        method.setAttribute(UnitConfiguration.ATTRIBUTE_KEY, this._configuration);
    }
}