import {ProcessMessageType} from './ProcessMessageType';


export interface ProcessExitMessage {
    readonly type: ProcessMessageType.EXIT;
    readonly exitCode?: number;
}
