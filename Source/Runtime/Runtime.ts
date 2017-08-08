import {RuntimeID} from './RuntimeID';
import {Singleton} from '../DI/Decorators/Singleton';


@Singleton()
export class Runtime {
    public readonly id: RuntimeID;


    public constructor() {
        let isBrowser: boolean = typeof window === 'object' && Object.prototype.toString.call(window) === '[object Window]';
        let isNode: boolean = typeof process === 'object' && Object.prototype.toString.call(process) === '[object process]';

        if (isBrowser && isNode) {
            this.id = RuntimeID.NodeWebkit;
        } else if (isBrowser) {
            this.id = RuntimeID.Browser;
        } else if (isNode) {
            this.id = RuntimeID.NodeJS;
        } else {
            this.id = RuntimeID.Unknown;
        }
    }
}
