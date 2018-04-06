import {EventArgs} from './EventArgs';


export type EventHandlerFunction<TArgs extends EventArgs = EventArgs> = (target: object, args: TArgs) => void;

