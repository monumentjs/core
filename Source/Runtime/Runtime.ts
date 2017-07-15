import {RuntimeID} from './RuntimeID';


export class Runtime {
    public static get id(): RuntimeID {
        let isBrowser: boolean = typeof window === 'object' && Object.prototype.toString.call(window) === '[object Window]';
        let isNode: boolean = typeof process === 'object' && Object.prototype.toString.call(process) === '[object process]';

        if (isBrowser && isNode) {
            return RuntimeID.NodeWebkit;
        } else if (isBrowser) {
            return RuntimeID.Browser;
        } else if (isNode) {
            return RuntimeID.NodeJS;
        } else {
            return RuntimeID.Unknown;
        }
    }
}
