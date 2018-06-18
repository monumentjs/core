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


    public onTestClassEnded(args: TestClassEndedEventArgs): void | Promise<void> {
        return undefined;
    }


    public onTestClassStarted(args: TestClassStartedEventArgs): void | Promise<void> {
        return undefined;
    }


    public onTestFileEnded(args: TestFileEndedEventArgs): void | Promise<void> {
        return undefined;
    }


    public onTestFileStarted(args: TestFileStartedEventArgs): void | Promise<void> {
        return undefined;
    }


    public onTestCaseEnded(args: TestCaseEndedEventArgs): void | Promise<void> {
        const {testClassName, testMethodName, status, duration, error} = args.testReport;
        const sb: StringBuilder = new StringBuilder();
        const statusStyle: Rule = this._styles.getStatusStyle(status);
        const durationStyle: Rule = this._styles.durationStyle;
        const errorStyle: Rule = this._styles.errorStyle;
        const textStyle: Rule = this._styles.textStyle;

        sb.append(statusStyle.apply(`[${TestStatus[status]}]`));
        sb.append(StringPool.SPACE);
        sb.append('in ' + durationStyle.apply(duration.toString() + 'ms'));
        sb.append(StringPool.SPACE);
        sb.append(testClassName);
        sb.append(' > ');
        sb.append(testMethodName);

        if (error) {
            sb.append(StringPool.EOL_CRLF);
            sb.append(errorStyle.apply(error.toString()));
        }

        sb.append(StringPool.EOL_CRLF);

        const message: string = textStyle.apply(sb.toString());

        process.stdout.write(message);
    }


    public onTestCaseStarted(args: TestCaseStartedEventArgs): void | Promise<void> {
        return undefined;
    }


    public onEnded(): void | Promise<void> {
        return undefined;
    }


    public onStarted(): void | Promise<void> {
        const sb: StringBuilder = new StringBuilder();

        sb.appendLine(`SYSTEM INFO:`);
        sb.appendLine(`CPU: ${this._cpu.coresCount} cores; ${this._cpu.architecture}`);
        sb.appendLine(`RAM: ${Math.round(this._ram.total.gigabytes)}Gb`);
        sb.appendLine(`OS: ${this._os.platform}`);

        const message: string = this._styles.textStyle.apply(sb.toString());

        process.stdout.write(message);
    }
}
