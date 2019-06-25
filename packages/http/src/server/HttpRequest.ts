import { Uri } from '@monument/uri';
import { HttpMethod } from '../base/HttpMethod';
import { HttpHeaders } from '../base/HttpHeaders';

export interface HttpRequest {
  readonly url: Uri;
  readonly method: HttpMethod;
  readonly headers: HttpHeaders;
}
