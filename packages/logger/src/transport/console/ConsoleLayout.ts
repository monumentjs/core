import { LogEvent } from '../../core/LogEvent';

export interface ConsoleLayout {
  transform(event: LogEvent): string;
}
