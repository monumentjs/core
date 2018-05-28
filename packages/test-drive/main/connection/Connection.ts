import {Delegate} from '@monument/core/main/decorators/Delegate';
import {Disposable} from '@monument/core/main/Disposable';
import {Event} from '@monument/events/main/Event';
import {ConfigurableEvent} from '@monument/events/main/ConfigurableEvent';
import {Destroy} from '@monument/decorators/main/stereotype/lifecycle/Destroy';
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
    private readonly _fileStarted: ConfigurableEvent<Channel<ProcessMessages>, FileStartMessage> = new ConfigurableEvent();
    private readonly _fileEnded: ConfigurableEvent<Channel<ProcessMessages>, FileEndMessage> = new ConfigurableEvent();
    private readonly _reported: ConfigurableEvent<Channel<ProcessMessages>, ReportMessage> = new ConfigurableEvent();
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

        this._channel.messageReceived.subscribe(this.handleMessageReceived);
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
        this._channel.messageReceived.unsubscribe(this.handleMessageReceived);
    }


    protected onFileStarted(target: Channel<ProcessMessages>, message: FileStartMessage) {
        this._fileStarted.trigger(target, message);
    }


    protected onFileEnded(target: Channel<ProcessMessages>, message: FileEndMessage) {
        this._fileEnded.trigger(target, message);
    }


    protected onReported(target: Channel<ProcessMessages>, message: ReportMessage) {
        this._reported.trigger(target, message);
    }

    @Delegate
    private handleMessageReceived(
        target: Channel<ProcessMessages>,
        args: ProcessMessageReceivedEventArgs<ProcessMessages>
    ) {
        const payload: ProcessMessages = args.message.payload;

        switch (payload.type) {
            case MessageType.FILE_START:
                this.onFileStarted(target, payload);
                break;

            case MessageType.FILE_END:
                this.onFileEnded(target, payload);
                break;

            case MessageType.REPORT:
                this.onReported(target, payload);
                break;

            default:
        }
    }
}
