import {BeforeAllDecorator} from './BeforeAllDecorator';


export function BeforeAll(...args: any[]) {
    new BeforeAllDecorator().apply(args);
}
