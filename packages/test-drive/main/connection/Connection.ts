import {Delegate} from '@monument/core/main/decorators/Delegate';
import {Disposable} from '@monument/core/main/Disposable';
import {Event} from '@monument/events/main/Event';
import {ConfigurableEvent} from '@monument/events/main/ConfigurableEvent';
import {Destroy} from '@monument/stereotype/main/Destroy';
import {Path} from '@monument/node/main/path/Path';
import {Channel} from '@monument/node/main/process/Channel';
import {ProcessMessage} from '@monument/node/main/process/ProcessMessage';
import {ProcessMessageReceivedEventArgs} from '@monument/node/main/process/ProcessMessageReceivedEventArgs';
import {TestReport} from '../reporter/TestReport';
import {ProcessMessages} from './message/ProcessMessages';
import {FileStartMessage} from './message/FileStartMessage';
import {FileEndMessage} from './message/FileEndMessage';
import {MessageType} from './message/MessageType';
import {ReportMessage} from './message/ReportMessage';


export abstract class Connection implements Disposable {
    private readonly _fileStarted: ConfigurableEvent<Channel<ProcessMessages>, FileStartMessage>;
    private readonly _fileEnded: ConfigurableEvent<Channel<ProcessMessages>, FileEndMessage>;
    private readonly _reported: ConfigurableEvent<Channel<ProcessMessages>, ReportMessage>;
    private readonly _channel: Channel<ProcessMessages>;


    public get fileStarted(): Event<Channel<ProcessMessages>, FileStartMessage> {
        return this._fileStarted;
    }


    public get fileEnded(): Event<Channel<ProcessMessages>, FileEndMessage> {
        return this._fileEnded;
    }


    public get reported(): Event<Channel<ProcessMessages>, ReportMessage> {
        return this._reported;
    }


    protected constructor(channel: Channel<ProcessMessages>) {
        this._channel = channel;
        this._fileStarted = new ConfigurableEvent(channel);
        this._fileEnded = new ConfigurableEvent(channel);
        this._reported = new ConfigurableEvent(channel);

        this._channel.messageReceived.subscribe(this.onMessageReceived);
    }


    public async startFile(path: Path): Promise<void> {
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


    public report(path: Path, report: TestReport): Promise<void> {
        const message: ReportMessage = {
            type: MessageType.REPORT,
            report: report,
            path: path.toString()
        };

        return this._channel.send(new ProcessMessage(message));
    }


    @Destroy
    public dispose(): void {
        this._channel.messageReceived.unsubscribe(this.onMessageReceived);
    }


    @Delegate
    private onMessageReceived(
        target: Channel<ProcessMessages>,
        args: ProcessMessageReceivedEventArgs<ProcessMessages>
    ) {
        const payload: ProcessMessages = args.message.payload;

        switch (payload.type) {
            case MessageType.FILE_START:
                this._fileStarted.dispatch(payload);
                break;

            case MessageType.FILE_END:
                this._fileEnded.dispatch(payload);
                break;

            case MessageType.REPORT:
                this._reported.dispatch(payload);
                break;

            default:
        }
    }
}
