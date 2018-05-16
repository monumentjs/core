import {Level} from '../level/Level';
import {Message} from '../message/Message';
import {Marker} from '../marker/Marker';
import {ReadOnlyMap} from '@monument/collections/main/ReadOnlyMap';


export interface LogEvent {
    readonly level: Level;
    readonly message: Message;
    readonly loggerName: string;
    readonly marker: Marker | undefined;

    readonly values: ReadOnlyMap<string, string>;
}
