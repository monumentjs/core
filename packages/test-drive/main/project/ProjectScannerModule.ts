import {ProjectScanner} from './scanner/ProjectScanner';
import {TestFileFilter} from './scanner/TestFileFilter';
import {Module} from '@monument/core/main/stereotype/Module';
import {IgnoreCaseComparator} from '@monument/core/main/text/IgnoreCaseComparator';


@Module({
    components: [
        IgnoreCaseComparator,
        TestFileFilter,
        ProjectScanner
    ]
})
export class ProjectScannerModule {

}
