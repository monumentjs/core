import {HttpResponse} from '../../Net/Http/Base/HttpResponse';
import {HttpRequest} from '../../Net/Http/Base/HttpRequest';
import {JsonContent} from '../../Net/Http/Content/JsonContent';
import {TextContent} from '../../Net/Http/Content/TextContent';
import {HttpHeaders} from '../../Net/Http/Headers/HttpHeaders';
import {XmlHttpRequestHeadersParser} from './XmlHttpRequestHeadersParser';


export class XmlHttpResponseConverter {
    public constructor(
        private readonly headersParser: XmlHttpRequestHeadersParser
    ) {}


    public convert(request: HttpRequest, xhr: XMLHttpRequest): HttpResponse {
        const response: HttpResponse = new HttpResponse(request.url, request.method, xhr.status);
        const headersString: string = xhr.getAllResponseHeaders();
        const headers: HttpHeaders = this.headersParser.parse(headersString);

        response.statusMessage = xhr.statusText;

        headers.copyTo(response.headers);

        switch (xhr.responseType) {
            case 'json':
                response.content = new JsonContent(xhr.response);
                break;

            case 'text':
                response.content = new TextContent(xhr.responseText);
                break;

            default:
        }

        return response;
    }
}
