import { LogEvent } from '@monument/logger';

/**
 * @todo need to change implementations to abstractions
 */
export interface ConsoleLayout {
  transform(event: LogEvent): string;
}
