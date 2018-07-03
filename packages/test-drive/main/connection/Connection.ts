import {Path} from '@monument/node/main/path/Path';
import {Channel} from '@monument/node/main/process/Channel';
import {ProcessMessage} from '@monument/node/main/process/ProcessMessage';
import {ProcessMessageReceivedEventArgs} from '@monument/node/main/process/ProcessMessageReceivedEventArgs';
import {TestReport} from '../report/TestReport';
import {ProcessMessages} from './messaging/ProcessMessages';
import {TestFileStartedMessage} from './messaging/TestFileStartedMessage';
import {TestFileEndedMessage} from './messaging/TestFileEndedMessage';
import {MessageType} from './messaging/MessageType';
import {ReportMessage} from './messaging/ReportMessage';
import {Disposable} from '@monument/core/main/Disposable';
import {ConfigurableEvent} from '@monument/core/main/events/ConfigurableEvent';
import {Event} from '@monument/core/main/events/Event';
import {Destroy} from '@monument/core/main/stereotype/lifecycle/Destroy';
import {Delegate} from '@monument/core/main/decorators/Delegate';


export abstract class Connection implements Disposable {
    private readonly _fileStarted: ConfigurableEvent<Channel<ProcessMessages>, TestFileStartedMessage> = new ConfigurableEvent();
    private readonly _fileEnded: ConfigurableEvent<Channel<ProcessMessages>, TestFileEndedMessage> = new ConfigurableEvent();
    private readonly _reported: ConfigurableEvent<Channel<ProcessMessages>, ReportMessage> = new ConfigurableEvent();
    private readonly _channel: Channel<ProcessMessages>;


    public async notifyTestFileStarted(path: Path): void {
        this._channel.sendMessage()
    }

    public get fileStarted(): Event<Channel<ProcessMessages>, TestFileStartedMessage> {
        return this._fileStarted;
    }


    public get fileEnded(): Event<Channel<ProcessMessages>, TestFileEndedMessage> {
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
        const message: TestFileStartedMessage = {
            type: MessageType.FILE_STARTED,
            path: path.toString()
        };

        return this._channel.sendMessage(new ProcessMessage(message));
    }


    public endFile(path: Path): Promise<void> {
        const message: TestFileEndedMessage = {
            type: MessageType.FILE_ENDED,
            path: path.toString()
        };

        return this._channel.sendMessage(new ProcessMessage(message));
    }


    public report(path: Path, report: TestReport): Promise<void> {
        const message: ReportMessage = {
            type: MessageType.REPORT,
            report: report,
            path: path.toString()
        };

        return this._channel.sendMessage(new ProcessMessage(message));
    }


    @Destroy
    public dispose(): void {
        this._channel.messageReceived.unsubscribe(this.handleMessageReceived);
    }


    protected onFileStarted(target: Channel<ProcessMessages>, message: TestFileStartedMessage) {
        this._fileStarted.trigger(target, message);
    }


    protected onFileEnded(target: Channel<ProcessMessages>, message: TestFileEndedMessage) {
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
            case MessageType.FILE_STARTED:
                this.onFileStarted(target, payload);
                break;

            case MessageType.FILE_ENDED:
                this.onFileEnded(target, payload);
                break;

            case MessageType.REPORT:
                this.onReported(target, payload);
                break;

            default:
        }
    }
}
