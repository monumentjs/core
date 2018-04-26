import {Module} from '@monument/stereotype/main/Module';
import {TestRunner} from './TestRunner';


@Module({
    exports: [
        TestRunner
    ]
})
export class TestRunnerModule {

}
