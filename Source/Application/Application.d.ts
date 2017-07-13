import { EventEmitter } from '../Events/EventEmitter';
export declare abstract class Application extends EventEmitter {
    static bootstrap(): ClassDecorator;
    private static _instance;
    static readonly instance: Application;
    abstract main(): Promise<void>;
}
