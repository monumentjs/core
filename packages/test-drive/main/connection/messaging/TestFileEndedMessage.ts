import {ProcessAction} from '@monument/node/main/process/messaging/ProcessAction';
import {MessageType} from './MessageType';


export interface TestFileEndedMessage extends ProcessAction {
    readonly actionType: MessageType.FILE_ENDED;
    readonly path: string;
}
