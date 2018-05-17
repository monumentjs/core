import {Module} from '@monument/stereotype/main/Module';
import {LoggerModule} from '@monument/logger/main/LoggerModule';
import {LoggingConfiguration} from './diagnostics/LoggingConfiguration';


@Module({
    components: [
        LoggerModule,
        LoggingConfiguration
    ]
})
export class ConfigurationModule {

}
