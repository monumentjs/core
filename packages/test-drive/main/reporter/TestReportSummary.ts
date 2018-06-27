

export class TestReportSummary {
    public readonly passedTestsCount: number;
    public readonly failedTestsCount: number;
    public readonly ignoredTestsCount: number;


    public constructor(passedTestsCount: number, failedTestsCount: number, ignoredTestsCount: number) {
        this.passedTestsCount = passedTestsCount;
        this.failedTestsCount = failedTestsCount;
        this.ignoredTestsCount = ignoredTestsCount;
    }
}
