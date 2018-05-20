import {Server, Socket} from 'net';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {DeferredObject} from '@monument/async/main/DeferredObject';
import {Event} from '@monument/events/main/Event';
import {EventArgs} from '@monument/events/main/EventArgs';
import {ConfigurableEvent} from '@monument/events/main/ConfigurableEvent';
import {Component} from '@monument/stereotype/main/Component';
import {Lazy} from '@monument/stereotype/main/Lazy';
import {Path} from '../path/Path';
import {ExitCode} from './ExitCode';
import {Channel} from './Channel';
import {ProcessInfo} from './ProcessInfo';
import {ProcessMessage} from './ProcessMessage';
import {ProcessException} from './ProcessException';
import {ProcessExitedEventArgs} from './ProcessExitedEventArgs';
import {ProcessMessageReceivedEventArgs} from './ProcessMessageReceivedEventArgs';


@Lazy
@Component
export class CurrentProcess implements Channel<any>, ProcessInfo {
    private readonly _process: NodeJS.Process = process;
    private readonly _messageReceived: ConfigurableEvent<this, ProcessMessageReceivedEventArgs<any>> = new ConfigurableEvent(this);
    private readonly _disconnected: ConfigurableEvent<this, EventArgs> = new ConfigurableEvent(this);
    private readonly _exited: ConfigurableEvent<this, ProcessExitedEventArgs> = new ConfigurableEvent(this);


    public get messageReceived(): Event<this, ProcessMessageReceivedEventArgs<any>> {
        return this._messageReceived;
    }


    public get disconnected(): Event<this, EventArgs> {
        return this._disconnected;
    }


    public get exited(): Event<this, ProcessExitedEventArgs> {
        return this._exited;
    }


    public get currentWorkingDirectory(): Path {
        return new Path(this._process.cwd());
    }


    public get groupId(): number | undefined {
        return this._process.getgid ? this._process.getgid() : undefined;
    }


    public get userId(): number | undefined {
        return this._process.getuid ? this._process.getuid() : undefined;
    }


    public get processId(): number {
        return this._process.pid;
    }


    public get parentProcessId(): number {
        return this._process.ppid;
    }


    public constructor() {
        this._process.on('exit', this.onExit);
        this._process.on('message', this.onMessage);
        this._process.on('disconnect', this.onDisconnect);
    }


    public send(message: ProcessMessage<any>): Promise<void> {
        const deferred: DeferredObject<void> = new DeferredObject();

        if (this._process.send != null) {
            this._process.send.call(this._process, message.payload, message.socket || message.server, (error: Error) => {
                if (error == null) {
                    deferred.resolve();
                } else {
                    deferred.reject(error);
                }
            });
        } else {
            deferred.reject(
                new ProcessException(
                    'Unable to send payload to master process: inter-process ipc (IPC) is not enabled.'
                )
            );
        }

        return deferred.promise;
    }


    public async exit(exitCode?: ExitCode): Promise<void> {
        this._process.exit(exitCode);
    }


    @Delegate
    private onMessage(message: any, socket: Socket | Server): void {
        this._messageReceived.dispatch(
            new ProcessMessageReceivedEventArgs(
                new ProcessMessage(
                    message,
                    socket instanceof Socket ? socket : undefined,
                    socket instanceof Server ? socket : undefined
                )
            )
        );
    }


    @Delegate
    private onExit(code: ExitCode): void {
        this._exited.dispatch(
            new ProcessExitedEventArgs(code)
        );
    }


    @Delegate
    private onDisconnect(): void {
        this._disconnected.dispatch(new EventArgs());
    }
}
