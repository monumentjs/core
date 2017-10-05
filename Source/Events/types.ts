import {EventArgs} from './EventArgs';


export type EventHandlerFunction<TTarget extends object = object, TArgs extends EventArgs = EventArgs> = (target: TTarget, args: TArgs) => void;

