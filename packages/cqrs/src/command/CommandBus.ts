import { Subject } from 'rxjs';
import { Command } from './Command';

export class CommandBus extends Subject<Command> {
  execute(command: Command) {
    this.next(command);
  }
}
