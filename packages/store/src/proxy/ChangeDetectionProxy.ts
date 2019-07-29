import { Observable } from 'rxjs';
import { ChangeEvent } from './ChangeEvent';

export interface ChangeDetectionProxy {
  readonly parent?: ChangeDetectionProxy;
  readonly changed: Observable<ChangeEvent>;
  readonly path: ReadonlyArray<PropertyKey>;

  onChange(event: ChangeEvent): void;
}
