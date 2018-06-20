import {DisplayNameDecorator} from './DisplayNameDecorator';


export function DisplayName(name: string) {
    return function (...args: any[]) {
        new DisplayNameDecorator(name).apply(args);
    };
}
