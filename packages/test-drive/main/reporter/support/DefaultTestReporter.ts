import {Component} from '@monument/core/main/stereotype/Component';
import {StringBuilder} from '@monument/core/main/text/StringBuilder';
import {Rule} from '@monument/terminal/main/design/Rule';
import {TestStatus} from '../../report/TestStatus';
import {TestReporter} from '../TestReporter';
import {DefaultTestReporterStyles} from './DefaultTestReporterStyles';
import {CPUInfo} from '@monument/node/main/system/info/cpu/CPUInfo';
import {RAMInfo} from '@monument/node/main/system/info/ram/RAMInfo';
import {OSInfo} from '@monument/node/main/system/info/os/OSInfo';
import {TestClassEndedEventArgs} from '../events/TestClassEndedEventArgs';
import {TestClassStartedEventArgs} from '../events/TestClassStartedEventArgs';
import {TestFileEndedEventArgs} from '../events/TestFileEndedEventArgs';
import {TestFileStartedEventArgs} from '../events/TestFileStartedEventArgs';
import {TestCaseEndedEventArgs} from '../events/TestCaseEndedEventArgs';
import {TestCaseStartedEventArgs} from '../events/TestCaseStartedEventArgs';
import {StringPool} from '@monument/core/main/StringPool';


/*tslint:disable:no-console*/

@Component
export class DefaultTestReporter implements TestReporter {
    private readonly _styles: DefaultTestReporterStyles;
    private readonly _cpu: CPUInfo;
    private readonly _ram: RAMInfo;
    private readonly _os: OSInfo;


    public constructor(
        themeResolver: DefaultTestReporterStyles,
        cpu: CPUInfo,
        ram: RAMInfo,
        os: OSInfo
    ) {
        this._cpu = cpu;
        this._ram = ram;
        this._os = os;
        this._styles = themeResolver;
    }


    public onTestClassEnded(args: TestClassEndedEventArgs): void {
        // Stub
    }


    public onTestClassStarted(args: TestClassStartedEventArgs): void {
        process.stdout.write(args.testClass.displayName + ' ' + args.testFile.path + StringPool.EOL_CRLF);
    }


    public onTestFileEnded(args: TestFileEndedEventArgs): void {
        // Stub
    }


    public onTestFileStarted(args: TestFileStartedEventArgs): void {
        // Stub
    }


    public onTestCaseEnded(args: TestCaseEndedEventArgs): void {
        const {testMethodName, status, duration, error} = args.testReport;
        const sb: StringBuilder = new StringBuilder();
        const statusStyle: Rule = this._styles.getStatusStyle(status);
        const durationStyle: Rule = this._styles.durationStyle;
        const errorStyle: Rule = this._styles.errorStyle;
        const textStyle: Rule = this._styles.textStyle;

        const statusText: string = statusStyle.apply(`${TestStatus[status]}`);
        const durationText: string = durationStyle.apply(duration.toString() + 'ms');

        sb.append(`    ${statusText} in ${durationText} ${testMethodName}`);

        if (error) {
            sb.append(StringPool.EOL_CRLF);
            sb.append(errorStyle.apply(error.toString()));
        }

        sb.append(StringPool.EOL_CRLF);

        const message: string = textStyle.apply(sb.toString());

        process.stdout.write(message);
    }


    public onTestCaseStarted(args: TestCaseStartedEventArgs): void {
        // Stub
    }


    public onEnded(): void | Promise<void> {
        // Stub
    }


    public onStarted(): void | Promise<void> {
        const sb: StringBuilder = new StringBuilder();

        sb.appendLine(`SYSTEM INFO:`);
        sb.appendLine(`CPU: ${this._cpu.coresCount} cores; ${this._cpu.architecture}`);
        sb.appendLine(`RAM: ${Math.round(this._ram.total.megabytes)}Mb`);
        sb.appendLine(`OS: ${this._os.platform}`);

        const message: string = this._styles.textStyle.apply(sb.toString());

        process.stdout.write(message);
    }
}
