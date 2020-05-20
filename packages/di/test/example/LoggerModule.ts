import { Module } from '../..';
import { LoggerCore } from './LoggerCore';

@Module({
  providers: [LoggerCore],
  exports: [LoggerCore]
})
export class LoggerModule {
}
