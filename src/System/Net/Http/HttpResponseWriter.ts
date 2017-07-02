import {ServerResponse} from 'http';
import {Assert} from '../../../Core/Assertion/Assert';
import {HeadersCollection} from './HeadersCollection';
import {StatusCode} from './StatusCode';
import {HttpContent} from './HttpContent';
import {HttpResponse} from './HttpResponse';
import {WriteStreamAdapter} from '../../IO/Adapters/WriteStreamAdapter';
import {DeferredObject} from '../../../Core/Async/DeferredObject';


export class HttpResponseWriter extends WriteStreamAdapter<ServerResponse, Buffer, Buffer> {
    public async send(response: HttpResponse): Promise<void> {
        this.setStatus(response.statusCode, response.statusMessage);
        this.setHeaders(response.headers);

        await this.writeContent(response.content);
        await this.close();
    }


    public close(): Promise<void> {
        let deferred: DeferredObject<void> = new DeferredObject<void>();

        this.baseStream.end((error: NodeJS.ErrnoException) => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    protected async transform(input: Buffer): Promise<Buffer> {
        return input;
    }


    private setStatus(statusCode: StatusCode, statusMessage: string = ''): void {
        this.baseStream.statusCode = statusCode;
        this.baseStream.statusMessage = statusMessage;
    }


    private setHeaders(headers: HeadersCollection): void {
        for (let {name, value} of headers) {
            this.baseStream.setHeader(name, value);
        }
    }


    private writeContent(content: HttpContent): Promise<void> {
        Assert.argument('content', content).notNull();

        this.setHeaders(content.headers);

        return content.copyTo(this);
    }
}