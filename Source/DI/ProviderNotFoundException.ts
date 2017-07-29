import {ContainerException} from './ContainerException';
import {ProviderToken} from './types';
import {Assert} from '../Assertion/Assert';


export class ProviderNotFoundException extends ContainerException {
    public constructor(token: ProviderToken<any>) {
        Assert.argument('token', token).notNull();

        if (typeof token === 'string') {
            super(`Provider with ID = "${token}" is not defined.`);
        } else {
            super(`Provider for type "${token.name}" is not defined.`);
        }
    }
}
