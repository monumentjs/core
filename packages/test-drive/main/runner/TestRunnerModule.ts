import {Module} from '@monument/decorators/main/stereotype/Module';
import {TestRunner} from './TestRunner';


@Module({
    components: [
        TestRunner
    ]
})
export class TestRunnerModule {

}
