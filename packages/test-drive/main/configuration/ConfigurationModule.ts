import {Module} from '@monument/stereotype/main/Module';
import {LoggingConfiguration} from './diagnostics/LoggingConfiguration';


@Module({
    components: [
        LoggingConfiguration
    ]
})
export class ConfigurationModule {

}
