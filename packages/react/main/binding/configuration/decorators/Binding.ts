import {BindingConfiguration} from '../BindingConfiguration';
import {BindingDecorator} from './BindingDecorator';


export function Binding(configuration: BindingConfiguration) {
    return function (...args: any[]) {
        new BindingDecorator(configuration).apply(args);
    };
}
