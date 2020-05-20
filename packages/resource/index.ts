// Export public API

import { Resource } from './src/resource/Resource';
import { BaseResource } from './src/resource/BaseResource';
import { Observable } from 'rxjs';
import { REPOSITORY } from './src/resource/IResource';

@Resource({
  baseUrl: 'http://localhost:3000/api/v1/user',
  get: {
    path: ':id'
  }
})
export class User extends BaseResource {
  id!: string;
  name!: string;

  delete(): Observable<void> {
    return this[REPOSITORY]!.delete({
      params: {
        id: this.id
      }
    });
  }
}

