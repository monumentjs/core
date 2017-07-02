import {Event} from '../../Core/Events/Event';
import {Process} from './Process';
import {Assert} from '../../Core/Assertion/Assert';


export type ProcessEventType = 'start' | 'exit' | 'close' | 'disconnect' | 'terminate' | 'message';


export class ProcessEvent extends Event {
    public static readonly EXIT: ProcessEventType = 'exit';
    public static readonly CLOSE: ProcessEventType = 'close';
    public static readonly TERMINATE: ProcessEventType = 'terminate';
    public static readonly DISCONNECT: ProcessEventType = 'disconnect';
    public static readonly START: ProcessEventType = 'start';
    public static readonly MESSAGE: ProcessEventType = 'message';


    private _process: Process;


    public get process(): Process {
        return this._process;
    }
    
    
    public constructor(eventType: ProcessEventType, process: Process) {
        super(eventType);

        Assert.argument('process', process).notNull();
        
        this._process = process;
    }
}
