import {Module} from '@monument/decorators/main/stereotype/Module';
import {LocalFileSystem} from './LocalFileSystem';


@Module({
    components: [
        LocalFileSystem
    ]
})
export class LocalFileSystemModule {

}
