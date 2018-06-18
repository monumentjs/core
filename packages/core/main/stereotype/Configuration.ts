import {ConfigurationDecorator} from './ConfigurationDecorator';


export function Configuration(...args: any[]) {
    new ConfigurationDecorator().apply(args);
}
