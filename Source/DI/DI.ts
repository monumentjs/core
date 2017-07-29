import {IProviderConfiguration} from './IProviderConfiguration';
import {Constructor} from '../types';
import {Container} from './Container';


export function Provider<T>(configuration: IProviderConfiguration<T> = {}): ClassDecorator {
    return (target: Constructor<T>): void => {
        Container.instance.register(target, configuration);
    };
}
