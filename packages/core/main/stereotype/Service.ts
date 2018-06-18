import {ServiceDecorator} from './ServiceDecorator';


export function Service(...args: any[]) {
    new ServiceDecorator().apply(args);
}
