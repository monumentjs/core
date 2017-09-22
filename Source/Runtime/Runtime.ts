import {RuntimeID} from './RuntimeID';
import {CoreType} from '../Core/Types/CoreType';


export class Runtime {
    public static get current(): RuntimeID {
        const isBrowser: boolean = typeof window === CoreType.Object && Object.prototype.toString.call(window) === '[object Window]';
        const isNode: boolean = typeof process === CoreType.Object && Object.prototype.toString.call(process) === '[object process]';

        if (isBrowser && isNode) {
            return RuntimeID.NodeWebkit;
        } else if (isBrowser) {
            return RuntimeID.Browser;
        } else if (isNode) {
            return RuntimeID.NodeJS;
        }

        return RuntimeID.Unknown;
    }
}
