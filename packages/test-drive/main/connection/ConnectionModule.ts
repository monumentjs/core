import {MasterConnection} from './MasterConnection';
import {SlaveConnection} from './SlaveConnection';
import {Module} from '@monument/core/main/stereotype/Module';


@Module({
    components: [
        MasterConnection,
        SlaveConnection
    ]
})
export class ConnectionModule {

}
