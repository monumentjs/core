import {UnitProvider} from './UnitProvider';
import {Container} from '../Container/Container';


export class FactoryUnitProvider<T> extends UnitProvider<T> {
    public getInstance(container: Container): T {
        return this.createInstance(container);
    }
}
