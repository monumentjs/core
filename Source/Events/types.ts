import {EventArgs} from './EventArgs';


export type EventHandlerFunction<TTarget extends object, TArgs extends EventArgs> = (target: TTarget, args: TArgs) => void;

