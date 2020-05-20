import { Command } from './Command';
import { Observable } from 'rxjs';

export interface CommandHandlerInterface<TCommand extends Command> {
  handle(command: TCommand): Promise<any> | Observable<any> | void;
}
