import {TestRunner} from './TestRunner';
import {Module} from '@monument/core/main/stereotype/Module';
import {ClassLoader} from '@monument/core/main/ClassLoader';
import {TestFileLoader} from './TestFileLoader';


@Module({
    dependsOn: [
        ClassLoader
    ],
    components: [
        TestFileLoader,
        TestRunner
    ]
})
export class TestRunnerModule {

}
