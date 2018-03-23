import {HttpServerApplication} from '../../../..//Application/HttpServerApplication';
import {HttpServerConfiguration} from '../../../..//Net/Http/HttpServerConfiguration';
import {HttpRoutingDispatcher} from '../../../..//Net/Http/Routing/HttpRoutingDispatcher';
import {HttpRoutesRegistry} from '../../../..//Net/Http/Routing/HttpRoutesRegistry';
import {HttpRequest} from '../../../..//Net/Http/HttpRequest';
import {HttpResponse} from '../../../..//Net/Http/HttpResponse';
import {StatusCode} from '../../../..//Net/Http/StatusCode';


export class HttpApplicationStub extends HttpServerApplication {
    public constructor() {
        const requestHandler = new HttpRoutingDispatcher(HttpRoutesRegistry.routes, {
            process: async (request: HttpRequest): Promise<HttpResponse> => {
                return new HttpResponse(request.url, request.method, StatusCode.NotFound);
            }
        });

        const serverConfiguration = new HttpServerConfiguration(requestHandler, 'localhost', 3000);

        super(serverConfiguration);
    }

    public main(): Promise<void> {
        return this._httpServer.listen();
    }
}
