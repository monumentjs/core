import { Subject } from 'rxjs';
import { Query } from './Query';

export class QueryBus extends Subject<Query> {
  get(query: Query) {
    this.next(query);
  }
}
