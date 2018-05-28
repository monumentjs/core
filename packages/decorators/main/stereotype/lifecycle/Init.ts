import {InitDecorator} from './InitDecorator';


export function Init(...args: any[]) {
    new InitDecorator().apply(args);
}
