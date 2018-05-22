import {TestStatus} from './TestStatus';


export interface TestReport {
    readonly testFilePath: string;
    readonly testClassName: string;
    readonly testMethodName: string;
    readonly duration: number;
    readonly status: TestStatus;
    readonly error?: Error;
}
