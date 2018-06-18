import {Module} from '../stereotype/Module';
import {VersionParser} from './VersionParser';
import {VersionComparator} from './VersionComparator';


@Module({
    components: [
        VersionComparator,
        VersionParser
    ]
})
export class VersionModule {

}
