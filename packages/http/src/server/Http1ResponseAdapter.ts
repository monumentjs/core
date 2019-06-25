import { ServerResponse } from 'http';
import { HttpResponse } from './HttpResponse';
import { HttpHeaders } from '../base/HttpHeaders';
import { StatusCode } from '../base/StatusCode';

export class Http1ResponseAdapter implements HttpResponse {
  readonly headers: HttpHeaders;
  readonly statusCode: StatusCode;

  constructor(response: ServerResponse) {
    this.statusCode = response.statusCode;
  }
}
