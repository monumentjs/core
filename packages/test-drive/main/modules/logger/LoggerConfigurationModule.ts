import {Module} from '@monument/stereotype/main/Module';
import {Unit} from '@monument/stereotype/main/Unit';
import {LoggerModule} from '@monument/logger/main/LoggerModule';
import {LoggerConfiguration} from '@monument/logger/main/logger/LoggerConfiguration';
import {ConsoleAppender} from '@monument/logger/main/appender/ConsoleAppender';


@Module({
    components: [
        LoggerModule
    ]
})
export class LoggerConfigurationModule {

    @Unit(LoggerConfiguration)
    public loggerConfiguration(): LoggerConfiguration {
        return new LoggerConfiguration([
            new ConsoleAppender()
        ]);
    }
}
