import {Module} from '@monument/core/main/stereotype/Module';
import {DefaultTestReporter} from './support/DefaultTestReporter';
import {DefaultTestReporterStyles} from './support/DefaultTestReporterStyles';
import {TestReporterManager} from './TestReporterManager';
import {Unit} from '@monument/core/main/stereotype/Unit';


@Module({
    components: [
        DefaultTestReporter,
        DefaultTestReporterStyles
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
