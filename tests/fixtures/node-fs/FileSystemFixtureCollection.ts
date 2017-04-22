import FixtureCollection from '../../../src/Testing/FixtureCollection';
import FileFixture from './FileFixture';
import DirectoryFixture from './DirectoryFixture';
import {AsyncResult} from '../../../src/Core/types';
import * as path from 'path';


export default class FileSystemFixtureCollection extends FixtureCollection {
    public get baseDirectory(): DirectoryFixture {
        return this[0] as DirectoryFixture;
    }


    public get singleLineTextFile(): FileFixture {
        return this[1] as FileFixture;
    }


    public get multiLineTextFile(): FileFixture {
        return this[2] as FileFixture;
    }


    public constructor(basePath: string) {
        basePath = path.join(process.cwd(), basePath);

        super([
            new DirectoryFixture(basePath),
            new FileFixture(basePath + '/single-line-text-file.txt', `1234567890`),
            new FileFixture(basePath + '/multi-line-text-file.txt', `One\nTwo\nThree\nFour\nFive\n`)
        ]);
    }


    protected async beforeCreate(): AsyncResult<void> {
        for (let fixture of this.toArray().reverse()) {
            try {
                await fixture.destroy();
            } catch (ex) {/* */}
        }
    }
}
