import {Module} from '@monument/decorators/main/stereotype/Module';
import {VersionParser} from './VersionParser';


@Module({
    components: [
        VersionParser
    ]
})
export class VersionModule {

}
