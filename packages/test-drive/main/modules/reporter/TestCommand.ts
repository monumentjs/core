import {InvalidStateException} from '@monument/core/main/exceptions/InvalidStateException';
import {Path} from '@monument/node/main/path/Path';
import {Class} from '@monument/reflection/main/Class';
import {TestFileReport} from './TestFileReport';
import {LinkedList} from '@monument/collections/main/LinkedList';
import {TestReport} from './TestReport';


export class TestCommand {
    private readonly _filePath: Path;
    private readonly _testClass: Class<object>;
    private _startTime: number | undefined;
    private _endTime: number | undefined;
    private _fileReport: TestFileReport | undefined;
    private _testReports: LinkedList<TestReport> = new LinkedList();


    public get filePath(): Path {
        return this._filePath;
    }


    public get testClass(): Class<object> {
        return this._testClass;
    }


    /**
     * Gets test file report in case test lifecycle is complete. Otherwise throws InvalidStateException.
     *
     * @throws {InvalidStateException} if test lifecycle is not complete which means that start() and end() methods were not called.
     */
    public get fileReport(): TestFileReport {
        if (this._fileReport == null) {
            if (this._startTime == null || this._endTime == null) {
                throw new InvalidStateException(`Unable to get test report: test lifecycle is not complete.`);
            }

            this._fileReport = new TestFileReport(
                this._filePath.toString(),
                this._testClass.name,
                this._endTime - this._startTime
            );
        }

        return this._fileReport;
    }


    public constructor(filePath: Path, testClass: Class<object>) {
        this._filePath = filePath;
        this._testClass = testClass;
    }


    /**
     * Notifies that test lifecycle has been started.
     */
    public start(): void {
        this._startTime = Date.now();
    }


    /**
     * Notifies that test lifecycle has been ended.
     */
    public end(): void {
        this._endTime = Date.now();
    }


    public addTestReport(report: TestReport): void {
        this._testReports.add(report);
    }
}
