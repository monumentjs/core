import { Injectable } from '../..';

@Injectable()
export class LoggerCore {

  log(...args: Array<any>): void {
    // tslint:disable-next-line:no-console
    console.log(...args);
  }
}
