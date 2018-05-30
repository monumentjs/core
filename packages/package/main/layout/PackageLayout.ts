import {Singleton} from '@monument/decorators/main/stereotype/Singleton';


@Singleton
export class ProjectLayout {
    public readonly mainDirectory: string = './main';
    public readonly testDirectory: string = './test';
    public readonly testFileNameSuffix: string = 'Test';
    public readonly testFileExtension: string = '.js';
    public readonly unitTestDirectory: string = './test/unit';
    public readonly integrationTestDirectory: string = './test/integration';
    public readonly endToEndTestDirectory: string = './test/e2e';
}
