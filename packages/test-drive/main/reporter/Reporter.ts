import {ReportRecord} from './ReportRecord';


export interface Reporter {
    report(record: ReportRecord): Promise<void>;
}
