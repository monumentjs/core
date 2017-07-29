import {Provider} from './Provider';
import {Container} from './Container';


export class SingletonProvider<T> extends Provider<T> {
    private _instance: T;


    public getInstance(container: Container): T {
        if (this._instance == null) {
            this._instance = this.createInstance(container);
        }

        return this._instance;
    }
}
