import EventEmitter from './Events/EventEmitter';
import Arguments from '../System/Process/Arguments';
export declare abstract class Application extends EventEmitter {
    static bootstrap(application: Application): void;
    abstract main(args?: Arguments): any;
}
