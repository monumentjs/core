import {ReadOnlyCollection} from '@monument/collections/main/ReadOnlyCollection';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {TestReport} from './TestReport';


export class TestScenarioReport {
    private readonly _testReports: ArrayList<TestReport> = new ArrayList();
    private readonly _testFilePath: string;


    public get testReports(): ReadOnlyCollection<TestReport> {
        return this._testReports;
    }


    public get testFilePath(): string {
        return this._testFilePath;
    }


    public constructor(testFilePath: string) {
        this._testFilePath = testFilePath;
    }


    public addTestReport(report: TestReport): void {
        this._testReports.add(report);
    }
}
