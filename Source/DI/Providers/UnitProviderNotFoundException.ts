import {ContainerException} from '../Container/ContainerException';
import {Assert} from '../../Assertion/Assert';
import {Constructor} from '../../types';


export class UnitProviderNotFoundException extends ContainerException {
    public constructor(type: Constructor<any>) {
        Assert.argument('type', type).notNull();

        super(`Provider for type "${type.name}" is not defined.`);
    }
}
