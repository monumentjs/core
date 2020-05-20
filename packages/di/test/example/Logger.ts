import { Context, Injectable } from '../..';
import { LoggerCore } from './LoggerCore';

@Injectable()
export class Logger {
  constructor(
    private context: Context,
    private core: LoggerCore
  ) {
  }

  log(...args: Array<any>) {
    this.core.log(this.context.name, ...args);
  }
}
