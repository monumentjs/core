import {Module} from '@monument/stereotype/main/Module';
import {LocalFileSystem} from './LocalFileSystem';


@Module({
    components: [
        LocalFileSystem
    ]
})
export class LocalFileSystemModule {
    
}
