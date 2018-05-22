import {Module} from '@monument/stereotype/main/Module';
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
