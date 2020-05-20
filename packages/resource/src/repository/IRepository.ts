import { IResource } from '../resource/IResource';
import { DeepPartial } from 'ts-essentials';
import { RequestOptions } from './RequestOptions';
import { Observable } from 'rxjs';

export interface IRepository<T extends IResource = IResource> {
  create(partial: DeepPartial<T>): T;

  get(options?: RequestOptions): Observable<T>;

  delete(options?: RequestOptions): Observable<void>;
}
