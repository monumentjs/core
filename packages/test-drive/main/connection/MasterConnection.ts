import {cpus} from 'os';
import {Lazy} from '@monument/stereotype/main/Lazy';
import {Component} from '@monument/stereotype/main/Component';
import {ForkPool} from '@monument/node/main/process/ForkPool';
import {Path} from '@monument/node/main/path/Path';
import {Connection} from './Connection';


@Lazy
@Component
export class MasterConnection extends Connection {
    private static readonly SLAVE_APPLICATION_EXECUTABLE: Path = Path.resolve([
        new Path(__dirname),
        new Path('../application/SlaveApplication')
    ]);


    public constructor() {
        super(new ForkPool(
            cpus().length,
            MasterConnection.SLAVE_APPLICATION_EXECUTABLE
        ));
    }
}
