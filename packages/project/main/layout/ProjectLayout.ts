import {Singleton} from '@monument/stereotype/main/Singleton';
import {Lazy} from '@monument/stereotype/main/Lazy';


@Lazy
@Singleton
export class ProjectLayout {
    public readonly packagesDirectory: string = './packages';
}
