import Detector, {EnvironmentID} from '../System/Environment/Detector';
import EventEmitter from './Events/EventEmitter';
import Arguments from '../System/Process/Arguments';


export abstract class Application extends EventEmitter {
    public static bootstrap(application: Application) {
        switch (Detector.detect()) {
            case EnvironmentID.Node:
                application.main(Arguments.fromProcess(process));
                break;

            default:
                application.main();
        }

    }


    public abstract main(args?: Arguments);
}
