import {MessageType} from './MessageType';
import {ProcessAction} from '@monument/node/main/process/messaging/ProcessAction';


export interface TestFileStartedMessage extends ProcessAction<MessageType> {
    readonly actionType: MessageType.FILE_STARTED;
    readonly path: string;
}
