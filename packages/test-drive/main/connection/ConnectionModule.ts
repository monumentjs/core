import {Module} from '@monument/decorators/main/stereotype/Module';
import {MasterConnection} from './MasterConnection';
import {SlaveConnection} from './SlaveConnection';


@Module({
    components: [
        MasterConnection,
        SlaveConnection
    ]
})
export class ConnectionModule {

}
