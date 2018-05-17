import {Lifecycle} from '@monument/core/main/lifecycle/Lifecycle';
import {Message} from '../message/Message';


export interface Appender extends Lifecycle {
    readonly name: string;

    append(message: Message): Promise<void>;
}
