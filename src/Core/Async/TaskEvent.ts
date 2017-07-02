import {Event} from '../Events/Event';
import {Task} from './Task';
import {TaskEventType} from './types';



export class TaskEvent extends Event {
    public static COMPLETE: TaskEventType = 'complete';
    public static ABORT: TaskEventType = 'abort';
    public static ERROR: TaskEventType = 'error';


    protected _task: Task<any>;


    public get task(): Task<any> {
        return this._task;
    }


    constructor(eventType: string, task: Task<any>) {
        super(eventType);

        this._task = task;
    }
}
