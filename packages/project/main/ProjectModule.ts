import {Module} from '@monument/decorators/main/stereotype/Module';
import {PackageLayout} from './layout/PackageLayout';
import {ProjectLayout} from './layout/ProjectLayout';


@Module({
    components: [
        ProjectLayout,
        PackageLayout
    ]
})
export class ProjectModule {

}
