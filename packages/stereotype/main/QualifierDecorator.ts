import {Decorator} from '@monument/reflection/main/Decorator';
import {Class} from '@monument/reflection/main/Class';
import {Method} from '@monument/reflection/main/Method';
import {QualifierConfiguration} from './QualifierConfiguration';
import {Qualifier} from './Qualifier';


export class QualifierDecorator extends Decorator {
    private readonly _configuration: QualifierConfiguration;


    public constructor(qualifierConfiguration: QualifierConfiguration) {
        super();

        this._configuration = qualifierConfiguration;
    }


    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(Qualifier);
        method.setAttribute(QualifierConfiguration.ATTRIBUTE_KEY, this._configuration);
    }
}