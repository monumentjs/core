import {ForkPool} from '@monument/node/main/process/ForkPool';
import {CPUInfo} from '@monument/node/main/system/info/cpu/CPUInfo';
import {TestFileEndedMessage} from './messaging/TestFileEndedMessage';
import {Path} from '@monument/node/main/path/Path';
import {Controller} from '@monument/core/main/stereotype/Controller';
import {ProcessController} from '@monument/node/main/process/messaging/ProcessController';
import {ProcessMessages} from './messaging/ProcessMessages';
import {MessageType} from './messaging/MessageType';
import {TestFileStartedMessage} from './messaging/TestFileStartedMessage';
import {ProcessMessage} from '@monument/node/main/process/ProcessMessage';


@Controller
export class MasterProcessController extends ProcessController<ProcessMessages> {
    private static readonly SLAVE_APPLICATION_EXECUTABLE: Path = Path.resolve([
        new Path(__dirname),
        new Path('./SlaveApplication')
    ]);


    public constructor(cpuInfo: CPUInfo) {
        super(new ForkPool<ProcessMessages>(
            cpuInfo.coresCount,
            MasterProcessController.SLAVE_APPLICATION_EXECUTABLE
        ));
    }


    public async [MessageType.FILE_STARTED](m: ProcessMessage<TestFileStartedMessage>) {

    }


    public async [MessageType.FILE_ENDED](m: ProcessMessage<TestFileEndedMessage>) {

    }
}
