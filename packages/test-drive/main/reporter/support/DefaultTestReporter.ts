import {Component} from '@monument/core/main/stereotype/Component';
import {StringBuilder} from '@monument/core/main/text/StringBuilder';
import {Rule} from '@monument/terminal/main/design/Rule';
import {TestStatus} from '../../report/TestStatus';
import {TestReporter} from '../TestReporter';
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
import {Themes} from '@monument/terminal/main/design/Themes';
import {TextStyle} from '@monument/terminal/main/design/TextStyle';
import {Terminal} from '@monument/terminal/main/terminal/Terminal';


/*tslint:disable:no-console*/

@Component
export class DefaultTestReporter implements TestReporter {
    private readonly _statusStyles = {
        [TestStatus.PASSED]: Themes.SUCCESS_LABEL,
        [TestStatus.FAILED]: Themes.ERROR_LABEL,
        [TestStatus.IGNORED]: Themes.SECONDARY_TEXT
    };

    private readonly _terminal: Terminal;
    private readonly _cpu: CPUInfo;
    private readonly _ram: RAMInfo;
    private readonly _os: OSInfo;


    public constructor(
        terminal: Terminal,
        cpu: CPUInfo,
        ram: RAMInfo,
        os: OSInfo
    ) {
        this._terminal = terminal;
        this._cpu = cpu;
        this._ram = ram;
        this._os = os;
    }


    public onTestClassEnded(args: TestClassEndedEventArgs): void {
        // Stub
    }


    public async onTestClassStarted(args: TestClassStartedEventArgs) {
        const sb: StringBuilder = new StringBuilder();
        const displayName: string = Themes.HEADING.apply(args.testClass.displayName);
        const filePath: string = Themes.SECONDARY_TEXT.apply(args.testFile.path.toString());

        sb.appendLine(displayName);
        sb.appendLine(filePath);
        sb.appendLine();

        const message: string = sb.toString();

        await this._terminal.writeText(message);
    }


    public async onTestFileEnded(args: TestFileEndedEventArgs) {
        await this._terminal.writeText(StringPool.EOL_CRLF);
    }


    public onTestFileStarted(args: TestFileStartedEventArgs) {
        // Stub
    }


    public async onTestCaseEnded(args: TestCaseEndedEventArgs) {
        const {testMethodName, status, duration, error} = args.testReport;
        const sb: StringBuilder = new StringBuilder();
        const statusStyle: Rule = this._statusStyles[status];

        const statusText: string = statusStyle.apply(`${TestStatus[status]}`);
        const durationText: string = TextStyle.BOLD.apply(duration.toString() + 'ms');

        sb.appendLine(`${statusText} in ${durationText} ${testMethodName}`);

        if (error) {
            const errorText = Themes.ERROR_TEXT.apply(error.toString());

            sb.appendLine(errorText);
        }

        const message: string = sb.toString();

        await this._terminal.writeText(message);
    }


    public onTestCaseStarted(args: TestCaseStartedEventArgs): void {
        // Stub
    }


    public onEnded(): void {
        // Stub
    }


    public async onStarted(): Promise<void> {
        const sb: StringBuilder = new StringBuilder();

        sb.appendLine(Themes.HEADING.apply(`SYSTEM INFO:`));
        sb.appendLine(`CPU: ${this._cpu.coresCount} cores; ${this._cpu.architecture}`);
        sb.appendLine(`RAM: ${Math.round(this._ram.total.megabytes)}Mb`);
        sb.appendLine(`OS: ${this._os.platform}`);
        sb.appendLine();

        const message: string = sb.toString();

        await this._terminal.writeText(message);
    }
}
