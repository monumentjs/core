import { Observable } from 'rxjs';

export interface ApplicationInterface {
  main(): void | number | Promise<void | number> | Observable<void | number>;
}
