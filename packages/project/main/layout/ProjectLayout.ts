import {Path} from '@monument/node/main/path/Path';
import {Lazy} from '@monument/core/main/stereotype/configuration/Lazy';
import {Singleton} from '@monument/core/main/stereotype/Singleton';


@Lazy
@Singleton
export class ProjectLayout {
    public readonly packagesDirectory: Path = new Path('./packages');
}
