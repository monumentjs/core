import {ProcessException} from '../../node/main/process/ProcessException';
import {Process} from './Process';


export class NoAssociatedProcessException extends ProcessException {
    public readonly helpInfo: string = `Process identifier will be set after call to 'start' method.`;


    public constructor(process: Process) {
        super(`There is no process associated with this object.`, process);
    }
}
