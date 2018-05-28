import {Module} from '@monument/decorators/main/stereotype/Module';
import {TestReporter} from './TestReporter';
import {TestReportRegistry} from './TestReportRegistry';


@Module({
    components: [
        TestReporter,
        TestReportRegistry
    ]
})
export class TestReporterModule {

}
