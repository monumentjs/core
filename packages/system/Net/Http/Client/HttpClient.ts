import {IncomingMessage} from 'http';
import {Collection} from '../../../../collections/main/Collection';
import {ListSet} from '../../../../collections/main/ListSet';
import {HttpRequest} from '../Base/HttpRequest';
import {HttpResponse} from '../Base/HttpResponse';
import {HttpRequestPreProcessor} from '../Base/HttpRequestPreProcessor';
import {HttpResponsePostProcessor} from '../Base/HttpResponsePostProcessor';
import {HttpRequestOutputStream} from './HttpRequestOutputStream';
import {HttpResponseInputStream} from './HttpResponseInputStream';


export class HttpClient {
    private _requestPreProcessors: Collection<HttpRequestPreProcessor> = new ListSet();
    private _responsePostProcessors: Collection<HttpResponsePostProcessor> = new ListSet();


    public async send(request: HttpRequest): Promise<HttpResponse> {
        request = await this.getPreProcessedRequest(request);

        let requestWriter: HttpRequestOutputStream = new HttpRequestOutputStream(request);

        await requestWriter.send();
        await requestWriter.close();

        let incomingMessage: IncomingMessage = await requestWriter.response;

        let responseReader = new HttpResponseInputStream(request, incomingMessage);

        await responseReader.readAll();

        let response = responseReader.response;

        response = await this.getPostProcessedResponse(response);

        return response;
    }


    public dispose(): void {
        // TODO: destroy all pending requests
    }


    protected addRequestPreProcessor(processor: HttpRequestPreProcessor): boolean {
        return this._requestPreProcessors.add(processor);
    }


    protected addResponsePostProcessor(processor: HttpResponsePostProcessor): boolean {
        return this._responsePostProcessors.add(processor);
    }


    private async getPreProcessedRequest(request: HttpRequest): Promise<HttpRequest> {
        for (let processor of this._requestPreProcessors) {
            request = await processor.transform(request);
        }

        return request;
    }


    private async getPostProcessedResponse(response: HttpResponse): Promise<HttpResponse> {
        for (let processor of this._responsePostProcessors) {
            response = await processor.transform(response);
        }

        return response;
    }
}
