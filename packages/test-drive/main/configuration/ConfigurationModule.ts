import {LoggingConfiguration} from './diagnostics/LoggingConfiguration';
import {Module} from '@monument/core/main/stereotype/Module';


@Module({
    components: [
        LoggingConfiguration
    ]
})
export class ConfigurationModule {

}
