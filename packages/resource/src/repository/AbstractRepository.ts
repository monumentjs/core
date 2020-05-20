import { DeepPartial } from 'ts-essentials';
import { Resource } from '../resource/Resource';
import { Observable, throwError } from 'rxjs';
import { Type } from '@monument/core';
import { plainToClass } from 'class-transformer';
import { fromFetch } from 'rxjs/fetch';
import { map, switchMap } from 'rxjs/operators';
import { IResource } from '../resource/IResource';
import { ResourceConfiguration } from '../resource/ResourceConfiguration';
import { Repository } from './Repository';
import { ResourceException } from '../resource/ResourceException';
import { RequestOptions } from './RequestOptions';
import { IRepository } from './IRepository';

export abstract class AbstractRepository<T extends IResource> implements IRepository<T> {
  private readonly type: Type<T>;
  private readonly configuration: ResourceConfiguration;

  constructor() {
    this.type = Reflect.getMetadata(Repository, this.constructor);
    this.configuration = Reflect.getMetadata(Resource, this.type);
  }

  create(partial: DeepPartial<T>): T {
    return plainToClass(this.type, partial, {
      enableImplicitConversion: true
    });
  }

  get(options?: RequestOptions): Observable<T> {
    if (this.configuration.get) {
      const baseUrl = this.configuration.baseUrl;
      const path = this.configuration.get.path;

      if (path == null) {
        throw new Error('Path is not defined');
      }

      const url = `${baseUrl}/${path}`;

      return fromFetch(url, {
        method: 'GET'
      }).pipe(
        switchMap(response => response.json()),
        map(value => {
          return plainToClass(this.type, value, {
            enableImplicitConversion: true
          });
        })
      );
    } else {
      return throwError(new ResourceException(`GET request is not supported`));
    }
  }

  delete(options?: RequestOptions): Observable<void> {
    if (this.configuration.delete) {
      const baseUrl = this.configuration.baseUrl;
      const path = this.configuration.delete.path;
      const url = `${baseUrl}${path}`;

      return fromFetch(url, {
        method: 'DELETE'
      }).pipe(
        map(() => undefined)
      );
    } else {
      return throwError(new ResourceException(`DELETE request is not supported`));
    }
  }
}
