import { HttpApplicationStub } from './_Stubs/HttpApplicationStub';
import { HttpRoute } from '../../..//Net/Http/Routing/HttpRoute';
import { HttpRequest } from '../../..//Net/Http/HttpRequest';
import { HttpResponse } from '../../..//Net/Http/HttpResponse';
import { StatusCode } from '../../..//Net/Http/StatusCode';
import { JsonContent } from '../../..//Net/Http/Content/JsonContent';
import { HttpRoutesRegistry } from '../../..//Net/Http/Routing/HttpRoutesRegistry';
import { HttpClient } from '../../..//Net/Http/Client/HttpClient';


describe(`HttpApplication`, () => {
    const unitFactory = new UnitFactory();

    function createRoute(url: string, value: object): HttpRoute {
        return new HttpRoute(url, {
            process: async (request: HttpRequest): Promise<HttpResponse> => {
                let httpResponse: HttpResponse = new HttpResponse(request.url, request.method, StatusCode.Ok);

                httpResponse.content = new JsonContent(value);

                return httpResponse;
            }
        });
    }


    test(`accepting requests`, async () => {
        const routeUrl: string = '/getTestJson';
        const jsonValue = {
            meta: {
                timeStamp: Date.now()
            }
        };

        const route: HttpRoute = createRoute(routeUrl, jsonValue);
        const client: HttpClient = unitFactory.getUnit(HttpClient);
        const application: HttpApplicationStub = unitFactory.getUnit(HttpApplicationStub);
        const host = application.configuration.host;
        const port = application.configuration.port;
        const requestUrl = `http://${host}:${port}${routeUrl}`;

        HttpRoutesRegistry.add(route);

        await application.main();

        assert.true(application.isRunning);

        const response: HttpResponse = await client.send(new HttpRequest(requestUrl));
        const content: JsonContent = response.content as JsonContent;

        await application.stop();

        assert.false(application.isRunning);

        assert.true(response.hasContent);
        expect(content).toBeInstanceOf(JsonContent);
        assert.equals(content.value, jsonValue);
    });
});
