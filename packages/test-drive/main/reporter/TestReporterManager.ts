import {ListSet} from '@monument/core/main/collection/mutable/ListSet';
import {TestReporter} from './TestReporter';
import {TestFileEndedEventArgs} from './events/TestFileEndedEventArgs';
import {TestFileStartedEventArgs} from './events/TestFileStartedEventArgs';
import {TestClassStartedEventArgs} from './events/TestClassStartedEventArgs';
import {TestClassEndedEventArgs} from './events/TestClassEndedEventArgs';
import {TestCaseStartedEventArgs} from './events/TestCaseStartedEventArgs';
import {TestCaseEndedEventArgs} from './events/TestCaseEndedEventArgs';
import {Component} from '@monument/core/main/stereotype/Component';
import {Sequence} from '@monument/core/main/collection/readonly/Sequence';


@Component
export class TestReporterManager implements TestReporter {
    private readonly _reporters: ListSet<TestReporter> = new ListSet();


    public constructor(reporters: Sequence<TestReporter>) {
        this._reporters.addAll(reporters);
    }


    public async onTestClassEnded(args: TestClassEndedEventArgs): Promise<void> {
        for (const reporter of this._reporters) {
            await reporter.onTestClassEnded(args);
        }
    }


    public async onTestClassStarted(args: TestClassStartedEventArgs): Promise<void> {
        for (const reporter of this._reporters) {
            await reporter.onTestClassStarted(args);
        }
    }


    public async onTestFileEnded(args: TestFileEndedEventArgs): Promise<void> {
        for (const reporter of this._reporters) {
            await reporter.onTestFileEnded(args);
        }
    }


    public async onTestFileStarted(args: TestFileStartedEventArgs): Promise<void> {
        for (const reporter of this._reporters) {
            await reporter.onTestFileStarted(args);
        }
    }


    public async onTestCaseEnded(args: TestCaseEndedEventArgs): Promise<void> {
        for (const reporter of this._reporters) {
            await reporter.onTestCaseEnded(args);
        }
    }


    public async onTestCaseStarted(args: TestCaseStartedEventArgs): Promise<void> {
        for (const reporter of this._reporters) {
            await reporter.onTestCaseStarted(args);
        }
    }


    public async onEnded(): Promise<void> {
        for (const reporter of this._reporters) {
            await reporter.onEnded();
        }
    }


    public async onStarted(): Promise<void> {
        for (const reporter of this._reporters) {
            await reporter.onStarted();
        }
    }
}
