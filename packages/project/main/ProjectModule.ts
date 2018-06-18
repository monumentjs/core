import {PackageLayout} from './layout/PackageLayout';
import {ProjectLayout} from './layout/ProjectLayout';
import {Module} from '@monument/core/main/stereotype/Module';


@Module({
    components: [
        ProjectLayout,
        PackageLayout
    ]
})
export class ProjectModule {

}
