import {GlobPattern} from '../../../FileSystem/GlobPattern';
import {InvalidArgumentException} from '../../../../core/main/exceptions/InvalidArgumentException';
import {Test} from '../../../../test-drive/Decorators/TestConfiguration';
import {Case} from '../../../../test-drive/Decorators/Case';


@Test()
export class GlobPatternSpec {

    @Case()
    public 'constructor() throws InvalidArgumentException if `glob` argument is empty string'() {
        expect(() => {
            return new GlobPattern('');
        }).toThrowError(InvalidArgumentException);
    }


    @Case()
    public 'test() `*` in unix paths at begin of file name'() {
        let pattern: GlobPattern = new GlobPattern(`/a/b/c/*.exe`);

        expect(pattern.test('/a/b/program.exe')).toBe(false);
        expect(pattern.test('/a/b/c/.exe')).toBe(true);
        expect(pattern.test('/a/b/c/program.exe')).toBe(true);
        expect(pattern.test('/a/b/c/d/createRequest/program.exe')).toBe(false);
        expect(pattern.test('/a/b/c/$ne/b.u.i.l.d/program.exe')).toBe(false);
    }


    @Case()
    public 'test() `*` in unix paths at middle of file name'() {
        let pattern: GlobPattern = new GlobPattern(`/a/b/c/_*.exe`);

        expect(pattern.test('/a/b/program.exe')).toBe(false);
        expect(pattern.test('/a/b/c/program.exe')).toBe(false);
        expect(pattern.test('/a/b/c/_.exe')).toBe(true);
        expect(pattern.test('/a/b/c/_program.exe')).toBe(true);
        expect(pattern.test('/a/b/c/d/createRequest/_program.exe')).toBe(false);
        expect(pattern.test('/a/b/c/_one/createRequest/_program.exe')).toBe(false);
        expect(pattern.test('/a/b/c/_one/createRequest/program.exe')).toBe(false);
    }


    @Case()
    public 'test() `*` in unix paths at end of file name'() {
        let pattern: GlobPattern = new GlobPattern(`/a/b/c/program.*`);

        expect(pattern.test('/a/b/program.exe')).toBe(false);
        expect(pattern.test('/a/b/c/program.exe')).toBe(true);
        expect(pattern.test('/a/b/c/program.')).toBe(true);
        expect(pattern.test('/a/b/c/_program.exe')).toBe(false);
        expect(pattern.test('/a/b/c/d/createRequest/program.exe')).toBe(false);
        expect(pattern.test('/a/b/c/_one/createRequest/program.exe')).toBe(false);
        expect(pattern.test('/a/b/c/_one/createRequest/_program.exe')).toBe(false);
    }


    @Case()
    public 'test() `*` in unix paths as directory name'() {
        let pattern: GlobPattern = new GlobPattern(`/a/b/c/*/package.json`);

        expect(pattern.test('/a/b/program.exe')).toBe(false);
        expect(pattern.test('/a/b/c/program/package.json')).toBe(true);
        expect(pattern.test('/a/b/c/program/m/package.json')).toBe(false);
        expect(pattern.test('/a/b/c/package.json')).toBe(false);
    }


    @Case()
    public 'test() `*` in unix paths at start of path'() {
        let pattern: GlobPattern = new GlobPattern(`*.exe`);

        expect(pattern.test('.exe')).toBe(true);
        expect(pattern.test('./program.exe')).toBe(false);
        expect(pattern.test('/a/b/program.exe')).toBe(false);
        expect(pattern.test('/a/b/c/program/package.json')).toBe(false);
        expect(pattern.test('/a/b/c/program/m/package.json')).toBe(false);
        expect(pattern.test('/a/b/c/package.json')).toBe(false);
    }


    @Case()
    public 'test() `*` in win32 paths at begin of file name'() {
        let pattern: GlobPattern = new GlobPattern(`D:\\a\\*.exe`);

        expect(pattern.test('D:\\program.exe')).toBe(false);
        expect(pattern.test('D:\\a\\.exe')).toBe(true);
        expect(pattern.test('D:\\a\\program.exe')).toBe(true);
        expect(pattern.test('D:\\a\\b\\c\\program.exe')).toBe(false);
    }


    @Case()
    public 'test() `*` in win32 paths at middle of file name'() {
        let pattern: GlobPattern = new GlobPattern(`D:\\projects\\_*.exe`);

        expect(pattern.test('D:\\program.exe')).toBe(false);
        expect(pattern.test('D:\\projects\\program.exe')).toBe(false);
        expect(pattern.test('D:\\projects\\_.exe')).toBe(true);
        expect(pattern.test('D:\\projects\\_program.exe')).toBe(true);
        expect(pattern.test('D:\\projects\\one\\createRequest\\_program.exe')).toBe(false);
        expect(pattern.test('D:\\projects\\_one\\createRequest\\_program.exe')).toBe(false);
        expect(pattern.test('D:\\projects\\_one\\createRequest\\program.exe')).toBe(false);
    }


    @Case()
    public 'test() `*` in win32 paths at end of file name'() {
        let pattern: GlobPattern = new GlobPattern(`D:\\projects\\program.*`);

        expect(pattern.test('D:\\program.exe')).toBe(false);
        expect(pattern.test('D:\\projects\\program.exe')).toBe(true);
        expect(pattern.test('D:\\projects\\program.')).toBe(true);
        expect(pattern.test('D:\\projects\\_program.exe')).toBe(false);
        expect(pattern.test('D:\\projects\\one\\createRequest\\program.exe')).toBe(false);
        expect(pattern.test('D:\\projects\\_one\\createRequest\\program.exe')).toBe(false);
        expect(pattern.test('D:\\projects\\_one\\createRequest\\_program.exe')).toBe(false);
    }


    @Case()
    public 'test() `*` in win32 paths as directory name'() {
        let pattern: GlobPattern = new GlobPattern(`D:\\projects\\*\\package.json`);

        expect(pattern.test('D:\\program.exe')).toBe(false);
        expect(pattern.test('D:\\projects\\program\\package.json')).toBe(true);
        expect(pattern.test('D:\\projects\\program\\module\\package.json')).toBe(false);
        expect(pattern.test('D:\\projects\\package.json')).toBe(false);
    }


    @Case()
    public 'test() `*` in win32 paths at start of path'() {
        let pattern: GlobPattern = new GlobPattern(`*.exe`);

        expect(pattern.test('.exe')).toBe(true);
        expect(pattern.test('.\\program.exe')).toBe(false);
        expect(pattern.test('D:\\program.exe')).toBe(false);
        expect(pattern.test('D:\\projects\\program\\package.json')).toBe(false);
        expect(pattern.test('D:\\projects\\program\\module\\package.json')).toBe(false);
        expect(pattern.test('D:\\projects\\package.json')).toBe(false);
    }


    @Case()
    public 'test() `**` in unix paths matches any number of any characters'() {
        let pattern: GlobPattern = new GlobPattern(`/a/b/c/**/package.json`);

        expect(pattern.test('/a/b/package.json')).toBe(false);
        expect(pattern.test('/a/b/c/package.json')).toBe(true);
        expect(pattern.test('/a/b/c/p/package.json')).toBe(true);
        expect(pattern.test('/a/b/c/p/m/package.json')).toBe(true);
        expect(pattern.test('/a/b/c/p/node_modules/m/package.json')).toBe(true);

        pattern = new GlobPattern(`**/package.json`);

        expect(pattern.test('pkg.json')).toBe(false);
        expect(pattern.test('package.json')).toBe(true);
        expect(pattern.test('/a/b/c/package.json')).toBe(true);
        expect(pattern.test('/a/b/c/p/package.json')).toBe(true);
        expect(pattern.test('/a/b/c/p/m/package.json')).toBe(true);
        expect(pattern.test('/a/b/c/p/node_modules/m/package.json')).toBe(true);

        pattern = new GlobPattern(`/a**/package.json`);

        expect(pattern.test('pkg.json')).toBe(false);
        expect(pattern.test('package.json')).toBe(false);
        expect(pattern.test('/a/b/c/package.json')).toBe(true);
        expect(pattern.test('/a/b/c/p/package.json')).toBe(true);
        expect(pattern.test('/a/b/c/p/m/package.json')).toBe(true);
        expect(pattern.test('/a/b/c/p/node_modules/m/package.json')).toBe(true);

        pattern = new GlobPattern(`/a/**c/package.json`);

        expect(pattern.test('pkg.json')).toBe(false);
        expect(pattern.test('package.json')).toBe(false);
        expect(pattern.test('/a/b/c/package.json')).toBe(true);
        expect(pattern.test('/a/b/c/p/package.json')).toBe(false);
        expect(pattern.test('/a/b/c/p/m/package.json')).toBe(false);
        expect(pattern.test('/a/b/c/p/node_modules/c/package.json')).toBe(true);
        expect(pattern.test('/a/b/c/p/node_modules/m/package.json')).toBe(false);
    }


    @Case()
    public 'test() `**` win32 paths matches any number of any characters'() {
        let pattern: GlobPattern = new GlobPattern(`D:\\projects\\**\\package.json`);

        expect(pattern.test('D:\\package.json')).toBe(false);
        expect(pattern.test('D:\\projects\\package.json')).toBe(true);
        expect(pattern.test('D:\\projects\\project\\package.json')).toBe(true);
        expect(pattern.test('D:\\projects\\project\\module\\package.json')).toBe(true);
        expect(pattern.test('D:\\projects\\project\\node_modules\\module\\package.json')).toBe(true);

        pattern = new GlobPattern(`**\\package.json`);

        expect(pattern.test('pkg.json')).toBe(false);
        expect(pattern.test('package.json')).toBe(true);
        expect(pattern.test('D:\\projects\\package.json')).toBe(true);
        expect(pattern.test('D:\\projects\\project\\package.json')).toBe(true);
        expect(pattern.test('D:\\projects\\project\\module\\package.json')).toBe(true);
        expect(pattern.test('D:\\projects\\project\\node_modules\\module\\package.json')).toBe(true);

        pattern = new GlobPattern(`D:\\pro**\\package.json`);

        expect(pattern.test('pkg.json')).toBe(false);
        expect(pattern.test('package.json')).toBe(false);
        expect(pattern.test('D:\\projects\\package.json')).toBe(true);
        expect(pattern.test('D:\\projects\\project\\package.json')).toBe(true);
        expect(pattern.test('D:\\projects\\project\\module\\package.json')).toBe(true);
        expect(pattern.test('D:\\projects\\project\\node_modules\\module\\package.json')).toBe(true);

        pattern = new GlobPattern(`D:\\**projects\\package.json`);

        expect(pattern.test('pkg.json')).toBe(false);
        expect(pattern.test('package.json')).toBe(false);
        expect(pattern.test('D:\\projects\\package.json')).toBe(true);
        expect(pattern.test('D:\\projects\\project\\package.json')).toBe(false);
        expect(pattern.test('D:\\projects\\project\\module\\package.json')).toBe(false);
        expect(pattern.test('D:\\projects\\project\\node_modules\\projects\\package.json')).toBe(true);
        expect(pattern.test('D:\\projects\\project\\node_modules\\module\\package.json')).toBe(false);
    }


    @Case()
    public '[...] in unix paths supports character ranges'() {
        let pattern: GlobPattern = new GlobPattern(`/a/b/downloads/photos[0-9][0-9][0-9][0-9].zip`);

        expect(pattern.test('/a/b/downloads/photos.zip')).toBe(false);
        expect(pattern.test('/a/b/downloads/photos2017.zip')).toBe(true);
        expect(pattern.test('/a/b/downloads/photos-2017.zip')).toBe(false);
        expect(pattern.test('/a/b/downloads/.zip')).toBe(false);
    }


    @Case()
    public '[...] in win32 paths supports character ranges'() {
        let pattern: GlobPattern = new GlobPattern(`D:\\downloads\\photos[0-9][0-9][0-9][0-9].zip`);

        expect(pattern.test('D:\\downloads\\photos.zip')).toBe(false);
        expect(pattern.test('D:\\downloads\\photos2017.zip')).toBe(true);
        expect(pattern.test('D:\\downloads\\photos-2017.zip')).toBe(false);
        expect(pattern.test('D:\\downloads\\.zip')).toBe(false);
    }
}

