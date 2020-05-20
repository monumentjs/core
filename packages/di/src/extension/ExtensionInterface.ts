import { Observable } from 'rxjs';

export interface ExtensionInterface<T extends object = object> {
  extend(source: Observable<T>): Observable<T>;
}
