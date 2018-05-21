import {Module} from '@monument/stereotype/main/Module';
import {TestReporter} from './TestReporter';


@Module({
    components: [
        TestReporter
    ]
})
export class TestReporterModule {

}
