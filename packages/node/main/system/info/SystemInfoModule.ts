import {CPUInfo} from './cpu/CPUInfo';
import {RAMInfo} from './ram/RAMInfo';
import {OSInfo} from './os/OSInfo';
import {Module} from '@monument/core/main/stereotype/Module';


@Module({
    components: [
        CPUInfo,
        RAMInfo,
        OSInfo
    ]
})
export class SystemInfoModule {

}
