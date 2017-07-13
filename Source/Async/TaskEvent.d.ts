import { Event } from '../Events/Event';
import { Task } from './Task';
import { TaskEventType } from './types';
export declare class TaskEvent extends Event {
    static COMPLETE: TaskEventType;
    static ABORT: TaskEventType;
    static ERROR: TaskEventType;
    protected _task: Task<any>;
    readonly task: Task<any>;
    constructor(eventType: string, task: Task<any>);
}
