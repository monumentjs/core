import { Application, ApplicationInterface, Run } from '../..';
import { HttpModule } from './HttpModule';
import { HttpClient } from './HttpClient';
import { Logger } from './Logger';
import { LoggerModule } from './LoggerModule';
import { CommandLineExtension } from './CommandLineExtension';

@Run()
@Application({
  extensions: [
    CommandLineExtension
  ],
  imports: [
    HttpModule,
    LoggerModule
  ],
  providers: [
    Logger
  ]
})
export class ExampleApplication implements ApplicationInterface {
  constructor(readonly client: HttpClient, readonly logger: Logger) {
    logger.log(client, logger);
  }

  async main(): Promise<number> {
    const response = await this.client.get('http://localhost:1234');

    this.logger.log(response);

    return 0;
  }
}
