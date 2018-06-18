import {Context} from './Context';
import {Invokable} from '../reflection/Invokable';


export interface InvocationContext extends Context {
    invoke(instance: object, invokable: Invokable): Promise<any>;
}
