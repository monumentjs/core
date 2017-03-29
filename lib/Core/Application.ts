import EventEmitter from './Events/EventEmitter';
import Arguments from '../System/Process/Arguments';
import {AsyncResult, Constructor} from './types';
import Environment from './Runtime/Runtime';
import {RuntimeID} from './Runtime/RuntimeID';
import UnknownRuntimeException from './Runtime/UnknownRuntimeException';
import {assertArgumentNotNull} from '../Assertion/Assert';


export abstract class Application extends EventEmitter {
    /**
     *
     * @throws {ArgumentNullException} If application constructor is not defined.
     * @throws {UnknownRuntimeException} If unable to identify application's runtime.
     */
    public static bootstrap(): ClassDecorator {
        return (applicationConstructor: Constructor): void => {
            assertArgumentNotNull('applicationConstructor', applicationConstructor);

            this._instance = new applicationConstructor();

            switch (Environment.id) {
                case RuntimeID.NodeJS:
                case RuntimeID.NodeWebkit:
                case RuntimeID.Electron:
                    this._instance.main(Arguments.getCurrentProcessArguments());
                    break;
                case RuntimeID.Browser:
                    this._instance.main();
                    break;
                default:
                    throw new UnknownRuntimeException(`Unable to identify application's runtime.`);
            }
        };
    }


    private static _instance: Application;


    public static get instance(): Application {
        return this._instance;
    }

    
    public abstract async main(args?: Arguments): AsyncResult<void>;
}
