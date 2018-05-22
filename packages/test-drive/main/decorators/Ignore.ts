import {IgnoreDecorator} from './IgnoreDecorator';


export function Ignore(reason: string) {
    return function (...args: any[]) {
        new IgnoreDecorator(reason).apply(args);
    };
}
