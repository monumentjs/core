import {Module} from '@monument/stereotype/main/Module';
import {MockFactory} from './MockFactory';


@Module({
    exports: [
        MockFactory
    ]
})
export class MockModule {

}
