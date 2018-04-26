import {ProcessMessageType} from './ProcessMessageType';


export interface ProcessInfoRequestMessage {
    readonly type: ProcessMessageType.INFO_REQUEST;
}
