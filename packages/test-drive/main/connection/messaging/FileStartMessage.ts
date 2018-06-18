import {MessageType} from './MessageType';


export interface FileStartMessage {
    readonly type: MessageType.FILE_START;
    readonly path: string;
}
