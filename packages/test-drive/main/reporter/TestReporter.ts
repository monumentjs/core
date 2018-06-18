import {TestFileStartedEventArgs} from './events/TestFileStartedEventArgs';
import {TestFileEndedEventArgs} from './events/TestFileEndedEventArgs';
import {TestClassStartedEventArgs} from './events/TestClassStartedEventArgs';
import {TestClassEndedEventArgs} from './events/TestClassEndedEventArgs';
import {TestCaseStartedEventArgs} from './events/TestCaseStartedEventArgs';
import {TestCaseEndedEventArgs} from './events/TestCaseEndedEventArgs';


export interface TestReporter {
    onStarted(): void | Promise<void>;
    onEnded(): void | Promise<void>;
    onTestFileStarted(args: TestFileStartedEventArgs): void | Promise<void>;
    onTestFileStarted(args: TestFileStartedEventArgs): void | Promise<void>;
    onTestFileEnded(args: TestFileEndedEventArgs): void | Promise<void>;
    onTestClassStarted(args: TestClassStartedEventArgs): void | Promise<void>;
    onTestClassEnded(args: TestClassEndedEventArgs): void | Promise<void>;
    onTestCaseStarted(args: TestCaseStartedEventArgs): void | Promise<void>;
    onTestCaseEnded(args: TestCaseEndedEventArgs): void | Promise<void>;
}
