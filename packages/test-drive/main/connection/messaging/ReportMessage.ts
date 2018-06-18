import {MessageType} from './MessageType';
import {TestReport} from '../../report/TestReport';


export interface ReportMessage {
    readonly type: MessageType.REPORT;
    readonly path: string;
    readonly report: TestReport;
}
