import {ProcessActionHandlerDecorator} from './ProcessActionHandlerDecorator';


export function ProcessActionHandler(...args: any[]) {
    new ProcessActionHandlerDecorator().apply(args);
}
