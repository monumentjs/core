import {ProcessMessageType} from './ProcessMessageType';


export interface ProcessMessageMessage<TMessage> {
    readonly type: ProcessMessageType.MESSAGE;
    readonly message: TMessage;
}
