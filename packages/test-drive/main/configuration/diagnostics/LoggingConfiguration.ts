import {LoggerConfiguration} from '@monument/logger/main/logger/LoggerConfiguration';
import {ConsoleAppender} from '@monument/logger/main/appender/console/ConsoleAppender';
import {Configuration} from '@monument/core/main/stereotype/Configuration';
import {Unit} from '@monument/core/main/stereotype/Unit';
import {Message} from '@monument/logger/main/message/Message';


@Configuration
export class LoggingConfiguration {


    @Unit(LoggerConfiguration)
    public loggerConfiguration(): LoggerConfiguration {
        return new LoggerConfiguration([
            this.getMainAppender()
        ]);
    }


    private getMainAppender(): ConsoleAppender {
        return new ConsoleAppender(ConsoleAppender.DEFAULT_NAME, {
            format: (message: Message): string => {
                if (message.error != null) {
                    return `${message.text}\n${message.error.toString()}`;
                } else {
                    return `${message.text}`;
                }
            }
        });
    }
}
