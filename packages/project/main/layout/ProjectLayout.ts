import {Singleton} from '@monument/decorators/main/stereotype/Singleton';
import {Lazy} from '@monument/decorators/main/stereotype/configuration/Lazy';
import {Path} from '@monument/node/main/path/Path';


@Lazy
@Singleton
export class ProjectLayout {
    public readonly packagesDirectory: Path = new Path('./packages');
}
