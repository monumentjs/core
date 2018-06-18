import {LazyDecorator} from './LazyDecorator';


export function Lazy(...args: any[]) {
    new LazyDecorator().apply(args);
}
