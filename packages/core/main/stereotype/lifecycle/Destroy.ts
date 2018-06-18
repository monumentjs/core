import {DestroyDecorator} from './DestroyDecorator';


export function Destroy(...args: any[]) {
    new DestroyDecorator().apply(args);
}
