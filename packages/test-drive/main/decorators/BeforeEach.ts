import {BeforeEachDecorator} from './BeforeEachDecorator';


export function BeforeEach(...args: any[]) {
    new BeforeEachDecorator().apply(args);
}
