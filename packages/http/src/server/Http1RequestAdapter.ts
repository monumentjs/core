import { IncomingMessage } from 'http';
import { Uri } from '@monument/uri';
import { HttpRequest } from './HttpRequest';
import { HttpHeaders } from '../base/HttpHeaders';
import { HttpMethod } from '../base/HttpMethod';

export class Http1RequestAdapter implements HttpRequest {
  readonly url: Uri;
  readonly method: HttpMethod;
  readonly headers: HttpHeaders;

  constructor(request: IncomingMessage) {
    this.url = new Uri(request.url || '/');
    this.method = request.method;
  }
}
