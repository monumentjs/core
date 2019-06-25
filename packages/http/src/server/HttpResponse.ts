import { StatusCode } from '../base/StatusCode';
import { HttpHeaders } from '../base/HttpHeaders';

export interface HttpResponse {
  readonly statusCode: StatusCode;
  readonly headers: HttpHeaders;
}
