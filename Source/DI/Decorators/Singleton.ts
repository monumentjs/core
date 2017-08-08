import {Assert} from '../../Assertion/Assert';
import {ISingletonConfiguration} from './ISingletonConfiguration';
import {Unit} from './Unit';


export function Singleton<T>(unitConfiguration: ISingletonConfiguration<T> = {}): ClassDecorator {
    Assert.argument('unitConfiguration', unitConfiguration).notNull();

    return Unit({
        isSingleton: true,
        ...unitConfiguration
    });
}
