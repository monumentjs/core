import {PreDestroyDecorator} from './PreDestroyDecorator';


export function PreDestroy(...args: any[]) {
    new PreDestroyDecorator().apply(args);
}
