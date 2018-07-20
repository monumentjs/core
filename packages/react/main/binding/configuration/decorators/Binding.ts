import {BindingConfiguration} from '../BindingConfiguration';
import {BindingDecorator} from './BindingDecorator';


export function Binding<T>(configuration: BindingConfiguration<T> = {}) {
    return function (...args: any[]) {
        new BindingDecorator(configuration).apply(args);
    };
}
