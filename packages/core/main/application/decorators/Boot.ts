import {BootDecorator} from './BootDecorator';


export function Boot(...args: any[]) {
    new BootDecorator().apply(args);
}
