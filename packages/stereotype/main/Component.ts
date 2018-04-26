import {ComponentDecorator} from './ComponentDecorator';


export function Component(...args: any[]) {
    new ComponentDecorator().apply(args);
}
