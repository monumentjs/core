import {Event} from '../Events/Event';
import {Task} from './Task';
import {TaskEventType} from './types';


export class TaskEvent extends Event {
    public static readonly COMPLETE: TaskEventType = 'complete';
    public static readonly ABORT: TaskEventType = 'abort';
    public static readonly ERROR: TaskEventType = 'error';


    constructor(eventType: string, public readonly task: Task<any>) {
        super(eventType);
    }
}
