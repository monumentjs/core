import {Module} from '@monument/decorators/main/stereotype/Module';
import {LoggingConfiguration} from './diagnostics/LoggingConfiguration';


@Module({
    components: [
        LoggingConfiguration
    ]
})
export class ConfigurationModule {

}
