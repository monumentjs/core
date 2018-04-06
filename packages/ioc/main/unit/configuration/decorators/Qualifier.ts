import {DecoratorTarget} from '../../../../../reflection/main/decorators/DecoratorTarget';
import {Target} from '../../../../../reflection/main/decorators/Target';
import {WithDecorator} from '@monument/reflection/main/decorators/WithDecorator';
import {WithAttribute} from '@monument/reflection/main/decorators/WithAttribute';
import {QualifierConfiguration} from './QualifierConfiguration';


export function Qualifier(qualifier: string): MethodDecorator {
    return function () {
        Target([DecoratorTarget.METHOD])(...arguments);
        WithDecorator(Qualifier)(...arguments);
        WithAttribute(
            QualifierConfiguration.ATTRIBUTE_KEY,
            new QualifierConfiguration(qualifier)
        )(...arguments);
    };
}
