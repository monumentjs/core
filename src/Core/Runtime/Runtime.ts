import {RuntimeID} from './RuntimeID';


export default class Runtime {
    public static get id(): RuntimeID {
        if (typeof window === 'object' && Object.prototype.toString.call(window) === '[object Window]') {
            return RuntimeID.Browser;
        } else if (typeof process === 'object' && Object.prototype.toString.call(process) === '[object process]') {
            return RuntimeID.NodeJS;
        } else {
            return RuntimeID.Unknown;
        }
    }
}
