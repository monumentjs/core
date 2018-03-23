import {Process} from './Process';
import {Exception} from '../../core/main/exceptions/Exception';


export class ProcessException extends Exception {
    public readonly process: Process;


    public constructor(message: string, process: Process) {
        super(message);

        this.process = process;
    }
}
