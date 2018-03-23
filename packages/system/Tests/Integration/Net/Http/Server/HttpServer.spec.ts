import {Test} from '../../../../../../test-drive/Decorators/TestConfiguration';
import {BeforeAll} from '@monument/test-drive/Decorators/BeforeAll';
import {AfterAll} from '@monument/test-drive/Decorators/AfterAll';
import {Case} from '../../../../../../test-drive/decorator/Case';
import {HttpClient} from '../../../../../Net/Http/Client/HttpClient';
import {HttpServer} from '../../../../../Net/Http/Server/HttpServer';
import {HttpServerConfiguration} from '../../../../../Net/Http/Server/HttpServerConfiguration';
import {HttpRequest} from '../../../../../Net/Http/Base/HttpRequest';
import {HttpResponse} from '../../../../../Net/Http/Base/HttpResponse';
import {HttpRequestHandler} from '../../../../../Net/Http/Server/HttpRequestHandler';
import {HttpRequestContext} from '../../../../../Net/Http/Server/HttpRequestContext';
import {TextContent} from '../../../../../Net/Http/Content/TextContent';
import {HttpMethod} from '../../../../../Net/Http/Base/HttpMethod';
import {StatusCode} from '../../../../../Net/Http/Base/StatusCode';


@Test()
export class HttpServerSpec {
    public static HOST: string = 'localhost';
    public static PORT: number = 8090;
    public static BASE_URL: string = `http://${HttpServerSpec.HOST}:${HttpServerSpec.PORT}`;

    protected client: HttpClient;
    protected server: HttpServer;


    @BeforeAll()
    public createServer() {
        let handler: HttpRequestHandler = {
            async process(context: HttpRequestContext) {
                context.response.content = new TextContent('Hi there');
            }
        };
        let configuration: HttpServerConfiguration = new HttpServerConfiguration(handler, HttpServerSpec.HOST, HttpServerSpec.PORT);

        this.server = new HttpServer(configuration);
    }


    @BeforeAll()
    public async startServer() {
        return this.server.run();
    }


    @BeforeAll()
    public createClient() {
        this.client = new HttpClient();
    }


    @AfterAll()
    public async stopServer() {
        return this.server.stop();
    }


    @Case()
    public 'server has running state'() {
        expect(this.server.isRunning).toBe(true);
    }


    @Case()
    public async 'server responds to client with text'() {
        let response: HttpResponse = await this.client.send(new HttpRequest(HttpMethod.GET, HttpServerSpec.BASE_URL));

        expect(response.statusCode).toBe(StatusCode.Ok);
        expect(response.statusMessage).toBe('');
        expect(response.method).toBe(HttpMethod.GET);
        expect(response.url.toString()).toBe(HttpServerSpec.BASE_URL);
    }
}
