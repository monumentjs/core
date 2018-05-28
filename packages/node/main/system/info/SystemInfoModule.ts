import {Module} from '@monument/decorators/main/stereotype/Module';
import {CPUInfo} from './cpu/CPUInfo';
import {RAMInfo} from './ram/RAMInfo';
import {OSInfo} from './os/OSInfo';


@Module({
    components: [
        CPUInfo,
        RAMInfo,
        OSInfo
    ]
})
export class SystemInfoModule {

}
