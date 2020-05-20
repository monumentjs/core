import { ExtensionInterface, Injectable } from '../..';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from './Logger';

@Injectable({
  providers: [
    Logger
  ]
})
export class CommandLineExtension implements ExtensionInterface {
  constructor(private logger: Logger) {
  }

  extend(source: Observable<object>): Observable<object> {
    return source.pipe(
      tap(instance => this.logger.log('extend', instance))
    );
  }
}
