import {EventArgs} from './EventArgs';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export type EventHandler<TArgs extends EventArgs<object>> = (args: TArgs) => void;
