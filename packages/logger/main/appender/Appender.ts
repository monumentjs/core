import {Lifecycle} from '@monument/core/main/lifecycle/Lifecycle';
import {LogEvent} from '../event/LogEvent';


export interface Appender extends Lifecycle {
    readonly name: string;

    append(event: LogEvent): Promise<void>;
}
