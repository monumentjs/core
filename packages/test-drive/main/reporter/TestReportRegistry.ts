import {Component} from '@monument/stereotype/main/Component';
import {LinkedList} from '@monument/collections/main/LinkedList';
import {TestReport} from './TestReport';
import {TestStatus} from './TestStatus';


@Component
export class TestReportRegistry {
    private readonly _reports: LinkedList<TestReport> = new LinkedList();
    private _failedTestsCount: number = 0;


    public get failedTestsCount(): number {
        return this._failedTestsCount;
    }

    public get hasFailedTests(): boolean {
        return this._failedTestsCount > 0;
    }


    public addReport(report: TestReport): void {
        this._reports.add(report);

        if (report.status === TestStatus.FAILED) {
            this._failedTestsCount++;
        }
    }
}
