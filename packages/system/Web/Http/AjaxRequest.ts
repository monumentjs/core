import {HttpEventArgs} from '../../Net/Http/Base/HttpEventArgs';
import {HttpRequest} from '../../Net/Http/Base/HttpRequest';
import {HttpHeaders} from '../../Net/Http/Headers/HttpHeaders';
import {HttpProgressEventArgs} from '../../Net/Http/Base/HttpProgressEventArgs';
import {HttpMethod} from '../../Net/Http/Base/HttpMethod';
import {Uri} from '../../Net/Uri/Uri';
import {ErrorEventArgs} from '@monument/core/Events/ErrorEventArgs';


export class AjaxRequest extends HttpRequest {

    public constructor(url: Uri | string, method: HttpMethod = HttpMethod.GET) {
        super(method, url);

        this._xhr = this.createRequest();
    }


    private createRequest(): XMLHttpRequest {
        const xhr = new XMLHttpRequest();

        this.setRequestAttributes(xhr);
        this.attachEventHandlers(xhr);

        this.abortRequested.subscribe(() => {
            xhr.abort();
        });

        return xhr;
    }


    private setRequestAttributes(xhr: XMLHttpRequest): void {
        const {method, url, authCredentials, headers, timeout, crossDomain} = this;

        xhr.open(method, url.toString(), true, authCredentials.name, authCredentials.password);

        xhr.timeout = timeout;
        xhr.withCredentials = crossDomain;

        for (const {key: name, value} of headers) {
            xhr.setRequestHeader(name, value);
        }
    }


    private attachEventHandlers(xhr: XMLHttpRequest): void {
        xhr.addEventListener('loadstart', () => {
            this._loadingStarted.dispatch(new HttpEventArgs());
        });

        xhr.addEventListener('loadend', () => {
            this._loadingEnded.dispatch(new HttpEventArgs());
        });

        xhr.addEventListener('load', () => {
            this._loaded.dispatch(new HttpEventArgs());
        });

        xhr.addEventListener('error', () => {
            this._loadingFailed.dispatch(new ErrorEventArgs());
        });

        xhr.addEventListener('abort', () => {
            this._loadingAborted.dispatch(new HttpEventArgs());
        });

        xhr.addEventListener('progress', (event: ProgressEvent) => {
            this._loadingProgress.dispatch(new HttpProgressEventArgs(event.lengthComputable, event.loaded, event.total));
        });

        xhr.addEventListener('timeout', () => {
            this..dispatchEvent(new HttpEventArgs(HttpEventArgs.LOAD_TIMEOUT));
        });

        xhr.upload.addEventListener('loadstart', () => {
            request.dispatchEvent(new HttpEventArgs(HttpEventArgs.UPLOAD_START));
        });

        xhr.upload.addEventListener('loadend', () => {
            request.dispatchEvent(new HttpEventArgs(HttpEventArgs.UPLOAD_END));
        });

        xhr.upload.addEventListener('load', () => {
            request.dispatchEvent(new HttpEventArgs(HttpEventArgs.UPLOADED));
        });

        xhr.upload.addEventListener('error', () => {
            request.dispatchEvent(new HttpEventArgs(HttpEventArgs.UPLOAD_ERROR));
        });

        xhr.upload.addEventListener('abort', () => {
            request.dispatchEvent(new HttpEventArgs(HttpEventArgs.UPLOAD_ABORT));
        });

        xhr.upload.addEventListener('progress', (event: ProgressEvent) => {
            request.dispatchEvent(new HttpProgressEventArgs(
                HttpEventArgs.UPLOAD_PROGRESS,
                event.lengthComputable,
                event.loaded,
                event.total
            ));
        });

        xhr.upload.addEventListener('timeout', () => {
            request.dispatchEvent(new HttpEventArgs(HttpEventArgs.UPLOAD_TIMEOUT));
        });
    }
}
