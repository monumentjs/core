import {MessageType} from './MessageType';


export interface FileEndMessage {
    readonly type: MessageType.FILE_END;
    readonly path: string;
}
