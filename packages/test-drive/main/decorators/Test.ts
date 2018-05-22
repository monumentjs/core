import {TestDecorator} from './TestDecorator';


export function Test(...args: any[]) {
    new TestDecorator().apply(args);
}
