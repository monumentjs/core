import {TestReport} from '../report/TestReport';
import {TestStatus} from '../report/TestStatus';
import {Component} from '@monument/core/main/stereotype/Component';
import {TestReportSummary} from './TestReportSummary';


@Component
export class TestReportSummaryBuilder {
    private _passedTestsCount: number = 0;
    private _failedTestsCount: number = 0;
    private _ignoredTestsCount: number = 0;


    public analyze(report: TestReport): void {
        switch (report.status) {
            case TestStatus.IGNORED:
                this._ignoredTestsCount++;
                break;
            case TestStatus.FAILED:
                this._failedTestsCount++;
                break;
            case TestStatus.PASSED:
                this._passedTestsCount++;
                break;
            default:
                break;
        }
    }


    public build(): TestReportSummary {
        return new TestReportSummary(this._passedTestsCount, this._failedTestsCount, this._ignoredTestsCount);
    }
}
