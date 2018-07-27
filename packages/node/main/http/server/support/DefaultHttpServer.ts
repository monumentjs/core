import {createServer as createHttpServer, IncomingMessage, ServerResponse} from 'http';
import {createServer as createSecureHttpServer} from 'https';
import {
    createSecureServer as createSecureHttp2Server,
    createServer as createHttp2Server,
    Http2ServerRequest,
    Http2ServerResponse
} from 'http2';
import {Server} from 'net';
import {Event} from '@monument/core/main/events/Event';
import {ConfigurableEvent} from '@monument/core/main/events/ConfigurableEvent';
import {AbstractLifecycle} from '@monument/core/main/lifecycle/AbstractLifecycle';
import {HttpServer} from '../HttpServer';
import {HttpServerConfiguration} from '../configuration/HttpServerConfiguration';
import {HttpMessageReceivedEventArgs} from '../events/HttpMessageReceivedEventArgs';
import {ServerRequestWrapper} from '../request/ServerRequestWrapper';
import {ServerResponseWrapper} from '../response/ServerResponseWrapper';
import {ErrorEventArgs} from '@monument/core/main/events/ErrorEventArgs';
import {Exception} from '@monument/core/main/exceptions/Exception';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {HttpProtocol} from '../../protocol/HttpProtocol';
import {UnknownHttpProtocolException} from '../../protocol/UnknownHttpProtocolException';
import {HttpAddress} from '../../HttpAddress';


export class DefaultHttpServer extends AbstractLifecycle implements HttpServer {
    private readonly _errorThrown: ConfigurableEvent<this, ErrorEventArgs> = new ConfigurableEvent();
    private readonly _messageReceived: ConfigurableEvent<this, HttpMessageReceivedEventArgs> = new ConfigurableEvent();
    private readonly _server: Server;
    private readonly _configuration: HttpServerConfiguration;

    public get errorThrown(): Event<this, ErrorEventArgs> {
        return this._errorThrown;
    }

    public get messageReceived(): Event<this, HttpMessageReceivedEventArgs> {
        return this._messageReceived;
    }

    public constructor(configuration: HttpServerConfiguration) {
        super();

        this._configuration = configuration;

        this._server = this.createServer();

        this._server.on('error', (err: Error) => {
            this._errorThrown.trigger(this, new ErrorEventArgs(Exception.cast(err)));
        });
    }

    public async start(): Promise<void> {
        this.setStarting();

        await new Promise((resolve, reject) => {
            this._server.listen({
                host: this._configuration.address.host,
                port: this._configuration.address.port
            }, (error?: Error) => {
                if (error == null) {
                    resolve();
                } else {
                    reject(error);
                }
            });
        });

        this.setStarted();
    }

    public async stop(): Promise<void> {
        this.setStopping();

        await new Promise((resolve, reject) => {
            this._server.close((error?: Error) => {
                if (error == null) {
                    resolve();
                } else {
                    reject(error);
                }
            });
        });

        this.setStopped();
    }

    @Delegate
    protected onHttpRequest(
        request: IncomingMessage | Http2ServerRequest,
        response: ServerResponse | Http2ServerResponse
    ): void {
        this._messageReceived.trigger(this, new HttpMessageReceivedEventArgs(
            new ServerRequestWrapper(request),
            new ServerResponseWrapper(response)
        ));
    }

    /**
     * @throws {UnknownHttpProtocolException} if protocol version is not supported
     */
    private createServer(): Server {
        switch (this._configuration.protocol) {
            case HttpProtocol.HTTP_1_0:
            case HttpProtocol.HTTP_1_1:
                return this.createHttp1Server();
            case HttpProtocol.HTTP_2_0:
                return this.createHttp2Server();
            default:
                throw new UnknownHttpProtocolException('Protocol version is not supported.');
        }
    }

    private createHttp1Server(): Server {
        const {keepAliveTimeout, sslConfiguration} = this._configuration;

        if (sslConfiguration == null) {
            const server = createHttpServer(this.onHttpRequest);

            if (keepAliveTimeout != null) {
                server.keepAliveTimeout = keepAliveTimeout.totalMilliseconds;
            }

            return server;
        } else {
            const server = createSecureHttpServer({
                key: sslConfiguration.key,
                cert: sslConfiguration.certificate
            }, this.onHttpRequest);

            if (keepAliveTimeout != null) {
                server.keepAliveTimeout = keepAliveTimeout.totalMilliseconds;
            }

            return server;
        }
    }

    private createHttp2Server(): Server {
        const {sslConfiguration} = this._configuration;

        if (sslConfiguration == null) {
            return createHttp2Server(this.onHttpRequest);
        } else {
            return createSecureHttp2Server({
                key: sslConfiguration.key,
                cert: sslConfiguration.certificate,
                passphrase: sslConfiguration.password
            }, this.onHttpRequest);
        }
    }
}
