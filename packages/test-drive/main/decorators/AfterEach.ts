import {AfterEachDecorator} from './AfterEachDecorator';


export function AfterEach(...args: any[]) {
    new AfterEachDecorator().apply(args);
}
