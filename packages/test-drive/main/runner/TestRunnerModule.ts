import {TestRunner} from './TestRunner';
import {Module} from '@monument/core/main/stereotype/Module';
import {TestFileLoader} from './TestFileLoader';
import {ClassLoader} from '@monument/core/main/ClassLoader';


@Module({
    components: [
        ClassLoader,
        TestFileLoader,
        TestRunner
    ]
})
export class TestRunnerModule {

}
