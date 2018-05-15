import {Module} from '@monument/stereotype/main/Module';
import {LocalFileSystem} from '@monument/node/main/file-system/local/LocalFileSystem';
import {ProjectScanner} from './scanner/ProjectScanner';
import {TestFileFilter} from './scanner/TestFileFilter';


@Module({
    components: [
        LocalFileSystem,
        TestFileFilter,
        ProjectScanner
    ]
})
export class ProjectModule {
    
}
