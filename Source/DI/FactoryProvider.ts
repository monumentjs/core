import {Provider} from './Provider';
import {Container} from './Container';


export class FactoryProvider<T> extends Provider<T> {
    public getInstance(container: Container): T {
        return this.createInstance(container);
    }
}
