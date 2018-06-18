import {Module} from '@monument/core/main/stereotype/Module';
import {TestClassContextFactory} from './factory/TestClassContextFactory';


@Module({
    components: [
        TestClassContextFactory
    ]
})
export class TestContextModule {
    
}
