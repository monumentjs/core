import {ForkPool} from '@monument/node/main/process/ForkPool';
import {Path} from '@monument/node/main/path/Path';
import {CPUInfo} from '@monument/node/main/system/info/cpu/CPUInfo';
import {Connection} from './Connection';
import {Lazy} from '@monument/core/main/stereotype/configuration/Lazy';
import {Component} from '@monument/core/main/stereotype/Component';


@Lazy
@Component
export class MasterConnection extends Connection {
    private static readonly SLAVE_APPLICATION_EXECUTABLE: Path = Path.resolve([
        new Path(__dirname),
        new Path('../application/SlaveApplication')
    ]);


    public constructor(cpuInfo: CPUInfo) {
        super(new ForkPool(
            cpuInfo.coresCount,
            MasterConnection.SLAVE_APPLICATION_EXECUTABLE
        ));
    }
}
