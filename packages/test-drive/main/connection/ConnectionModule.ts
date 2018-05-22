import {Module} from '@monument/stereotype/main/Module';
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
