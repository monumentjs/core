import {Module} from '@monument/decorators/main/stereotype/Module';
import {LoggerManager} from './manager/LoggerManager';


@Module({
    components: [
        LoggerManager
    ]
})
export class LoggerModule {

}
