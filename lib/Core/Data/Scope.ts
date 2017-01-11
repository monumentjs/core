import EventEmitter from '../EventEmitter';


export default class Scope<S> extends EventEmitter {
    public extend<T extends S>(): Scope<T> {
        return Object.create(this);
    }
}
