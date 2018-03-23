import {NodeApplication} from './NodeApplication';
import {HttpServer} from '../Net/Http/Server/HttpServer';
import {HttpServerConfiguration} from '../Net/Http/Server/HttpServerConfiguration';
import {Task} from '@monument/async/main/Task';
import {Delegate} from '@monument/core/Events/decorator/Delegate';


export abstract class HttpServerApplication extends NodeApplication implements Task {
    private _httpServer: HttpServer;


    protected get httpServer(): HttpServer {
        return this._httpServer;
    }


    public get isRunning(): boolean {
        return this.httpServer.isRunning;
    }


    public constructor(configuration: HttpServerConfiguration) {
        super();

        this._httpServer = new HttpServer(configuration);
    }


    public start(): Promise<void> {
        return this.httpServer.run();
    }


    public stop(): Promise<void> {
        return this.httpServer.stop();
    }


    @Delegate()
    protected async onUnhandledRejection(error: any): Promise<void> {
        await this.stop();

        super.onUnhandledRejection(error);
    }
}
