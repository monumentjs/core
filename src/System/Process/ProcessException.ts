import {Exception} from '../../Core/Exceptions/Exception';
import {Process} from './Process';


export class ProcessException extends Exception {
    public readonly process: Process;
    

    public constructor(message: string, process: Process) {
        super(message);
        
        this.process = process;
    }
}
