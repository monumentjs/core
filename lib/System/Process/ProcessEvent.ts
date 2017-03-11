import Event from '../../Core/Events/Event';
import ChildProcess from './Process';


export type ProcessEventType = 'exit' | 'close' | 'disconnect' | 'terminate';


export default class ProcessEvent extends Event {
    public static readonly EXIT: ProcessEventType = 'exit';
    public static readonly CLOSE: ProcessEventType = 'close';
    public static readonly TERMINATE: ProcessEventType = 'terminate';
    public static readonly DISCONNECT: ProcessEventType = 'disconnect';
    
    
    private _process: ChildProcess;
    

    public get process(): ChildProcess {
        return this._process;
    }
    
    
    public constructor(eventType: ProcessEventType, process: ChildProcess) {
        super(eventType);
        
        this._process = process;
    }
}
