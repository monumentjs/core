import Event from '../../Core/Events/Event';
import ChildProcess from './Process';
import {assertArgumentNotNull} from '../../Assertion/Assert';


export type ProcessEventType = 'start' | 'exit' | 'close' | 'disconnect' | 'terminate' | 'message';


export default class ProcessEvent extends Event {
    public static readonly EXIT: ProcessEventType = 'exit';
    public static readonly CLOSE: ProcessEventType = 'close';
    public static readonly TERMINATE: ProcessEventType = 'terminate';
    public static readonly DISCONNECT: ProcessEventType = 'disconnect';
    public static readonly START: ProcessEventType = 'start';
    public static readonly MESSAGE: ProcessEventType = 'message';


    private _process: ChildProcess;


    public get process(): ChildProcess {
        return this._process;
    }
    
    
    public constructor(eventType: ProcessEventType, process: ChildProcess) {
        super(eventType);

        assertArgumentNotNull('process', process);
        
        this._process = process;
    }
}
