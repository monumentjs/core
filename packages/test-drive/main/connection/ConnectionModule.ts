import {MasterProcessController} from './MasterProcessController';
import {SlaveConnection} from './SlaveConnection';
import {Module} from '@monument/core/main/stereotype/Module';


@Module({
    components: [
        MasterProcessController,
        SlaveConnection
    ]
})
export class ConnectionModule {

}
