import {ControllerDecorator} from './ControllerDecorator';


export function Controller(...args: any[]) {
    new ControllerDecorator().apply(args);
}
