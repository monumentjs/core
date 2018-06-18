import {SingletonDecorator} from './SingletonDecorator';


export function Singleton(...args: any[]) {
    new SingletonDecorator().apply(args);
}
