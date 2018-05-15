import {Module} from '@monument/stereotype/main/Module';
import {LoggerManager} from './manager/LoggerManager';


@Module({
    components: [
        LoggerManager
    ]
})
export class LoggerModule {

}
