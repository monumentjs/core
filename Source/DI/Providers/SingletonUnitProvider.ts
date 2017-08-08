import {UnitProvider} from './UnitProvider';
import {Container} from '../Container/Container';


export class SingletonUnitProvider<T> extends UnitProvider<T> {
    private _instance: T;


    public getInstance(container: Container): T {
        if (this._instance == null) {
            this._instance = this.createInstance(container);
        }

        return this._instance;
    }
}
