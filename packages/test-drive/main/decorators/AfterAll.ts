import {AfterAllDecorator} from './AfterAllDecorator';


export function AfterAll(...args: any[]) {
    new AfterAllDecorator().apply(args);
}
