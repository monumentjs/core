import {EventEmitter} from '../Events/EventEmitter';
import {Constructor} from '../types';
import {Container} from '../DI/Container/Container';


export class ComponentBase extends EventEmitter {
    protected getUnit<T>(type: Constructor<T>): T {
        return Container.get(type);
    }
}
