import {Module} from '@monument/core/main/stereotype/Module';
import {DefaultTestReporter} from './support/DefaultTestReporter';
import {TestReporterManager} from './TestReporterManager';
import {Unit} from '@monument/core/main/stereotype/Unit';
import {TerminalModule} from '@monument/terminal/main/terminal/TerminalModule';
import {TestReportSummaryBuilder} from './TestReportSummaryBuilder';


@Module({
    dependsOn: [
        TerminalModule
    ],
    components: [
        DefaultTestReporter,
        TestReportSummaryBuilder
    ]
})
export class TestReporterModule {

    @Unit(TestReporterManager)
    public getTestReporterManager(defaultTestReporter: DefaultTestReporter): TestReporterManager {
        return new TestReporterManager([
            defaultTestReporter
        ]);
    }
}
