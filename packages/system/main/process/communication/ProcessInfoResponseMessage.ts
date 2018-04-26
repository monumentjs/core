import {ProcessMessageType} from './ProcessMessageType';
import {ProcessInfo} from '../ProcessInfo';


export interface ProcessInfoResponseMessage {
    readonly type: ProcessMessageType.INFO_RESPONSE;
    readonly info: ProcessInfo;
}
