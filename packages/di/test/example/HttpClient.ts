import { Injectable } from '../..';
import { Logger } from './Logger';

@Injectable({
  providers: [
    Logger
  ]
})
export class HttpClient {
  constructor(private logger: Logger) {
  }

  async get(url: string): Promise<string> {
    this.logger.log(`GET ${url}`);

    return url;
  }
}
