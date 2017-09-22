import {Event} from '../Events/Event';
import {Task} from './Task';


export type TaskEventType = 'complete' | 'error' | 'abort';


export class TaskEvent extends Event {
    public static readonly COMPLETE: TaskEventType = 'complete';
    public static readonly ABORT: TaskEventType = 'abort';
    public static readonly ERROR: TaskEventType = 'error';


    constructor(eventType: TaskEventType, public readonly task: Task<any>) {
        super(eventType);
    }
}
