import {Path} from '@monument/node/main/path/Path';
import {Lazy} from '@monument/core/main/stereotype/configuration/Lazy';
import {Singleton} from '@monument/core/main/stereotype/Singleton';


@Lazy
@Singleton
export class PackageLayout {
    public readonly executableFileExtension: string = '.js';
    public readonly mainDirectory: Path = new Path('./main');
    public readonly testDirectory: Path = new Path('./test');
    public readonly testFileNameSuffix: string = 'Test';
    public readonly unitTestDirectory: Path = new Path('./test/unit');
    public readonly integrationTestDirectory: Path = new Path('./test/integration');
    public readonly endToEndTestDirectory: Path = new Path('./test/e2e');
}
