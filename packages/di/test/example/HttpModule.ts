import { Module } from '../..';
import { LoggerModule } from './LoggerModule';
import { HttpClient } from './HttpClient';

@Module({
  imports: [LoggerModule],
  providers: [HttpClient],
  exports: [HttpClient]
})
export class HttpModule {
}
