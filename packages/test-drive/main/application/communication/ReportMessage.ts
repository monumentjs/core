import {MessageType} from './MessageType';
import {SerializedTestReport} from '../../modules/reporter/SerializedTestReport';


export interface ReportMessage {
    readonly type: MessageType.REPORT;
    readonly path: string;
    readonly report: SerializedTestReport;
}
