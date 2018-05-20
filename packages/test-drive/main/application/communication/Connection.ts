import {Path} from '@monument/node/main/path/Path';
import {Channel} from '@monument/node/main/process/Channel';
import {ProcessMessage} from '@monument/node/main/process/ProcessMessage';
import {ProcessMessages} from './ProcessMessages';
import {FileStartMessage} from './FileStartMessage';
import {FileEndMessage} from './FileEndMessage';
import {MessageType} from './MessageType';
import {ReportMessage} from './ReportMessage';
import {TestFileReport} from '../../modules/reporter/TestFileReport';


export class Connection {
    private readonly _channel: Channel<ProcessMessages>;


    public constructor(channel: Channel<ProcessMessages>) {
        this._channel = channel;
    }


    public startFile(path: Path): Promise<void> {
        const message: FileStartMessage = {
            type: MessageType.FILE_START,
            path: path.toString()
        };

        return this._channel.send(new ProcessMessage(message));
    }


    public endFile(path: Path): Promise<void> {
        const message: FileEndMessage = {
            type: MessageType.FILE_END,
            path: path.toString()
        };

        return this._channel.send(new ProcessMessage(message));
    }


    public async report(path: Path, report: TestFileReport): Promise<void> {
        const message: ReportMessage = {
            type: MessageType.REPORT,
            report: report.toJSON(),
            path: path.toString()
        };

        return this._channel.send(new ProcessMessage(message));
    }
}
