import {GlobPattern} from '../../../file-system/GlobPattern';
import {InvalidArgumentException} from '../../../../core/main/exceptions/InvalidArgumentException';
import {Test} from '../../../../test-drive/Decorators/TestConfiguration';
import {Case} from '../../../../test-drive/Decorators/Case';


export class GlobPatternSpec {

    @Test
    public 'constructor() throws InvalidArgumentException if `glob` argument is empty string'(assert: Assert) {
        assert.throws(() => {
            return new GlobPattern('');
        }, InvalidArgumentException);
    }


    @Test
    public 'test() `*` in unix paths at begin of file name'(assert: Assert) {
        let pattern: GlobPattern = new GlobPattern(`/a/b/c/*.exe`);

        assert.false(pattern.test('/a/b/program.exe'));
        assert.true(pattern.test('/a/b/c/.exe'));
        assert.true(pattern.test('/a/b/c/program.exe'));
        assert.false(pattern.test('/a/b/c/d/createRequest/program.exe'));
        assert.false(pattern.test('/a/b/c/$ne/b.u.i.l.d/program.exe'));
    }


    @Test
    public 'test() `*` in unix paths at middle of file name'(assert: Assert) {
        let pattern: GlobPattern = new GlobPattern(`/a/b/c/_*.exe`);

        assert.false(pattern.test('/a/b/program.exe'));
        assert.false(pattern.test('/a/b/c/program.exe'));
        assert.true(pattern.test('/a/b/c/_.exe'));
        assert.true(pattern.test('/a/b/c/_program.exe'));
        assert.false(pattern.test('/a/b/c/d/createRequest/_program.exe'));
        assert.false(pattern.test('/a/b/c/_one/createRequest/_program.exe'));
        assert.false(pattern.test('/a/b/c/_one/createRequest/program.exe'));
    }


    @Test
    public 'test() `*` in unix paths at end of file name'(assert: Assert) {
        let pattern: GlobPattern = new GlobPattern(`/a/b/c/program.*`);

        assert.false(pattern.test('/a/b/program.exe'));
        assert.true(pattern.test('/a/b/c/program.exe'));
        assert.true(pattern.test('/a/b/c/program.'));
        assert.false(pattern.test('/a/b/c/_program.exe'));
        assert.false(pattern.test('/a/b/c/d/createRequest/program.exe'));
        assert.false(pattern.test('/a/b/c/_one/createRequest/program.exe'));
        assert.false(pattern.test('/a/b/c/_one/createRequest/_program.exe'));
    }


    @Test
    public 'test() `*` in unix paths as directory name'(assert: Assert) {
        let pattern: GlobPattern = new GlobPattern(`/a/b/c/*/package.json`);

        assert.false(pattern.test('/a/b/program.exe'));
        assert.true(pattern.test('/a/b/c/program/package.json'));
        assert.false(pattern.test('/a/b/c/program/m/package.json'));
        assert.false(pattern.test('/a/b/c/package.json'));
    }


    @Test
    public 'test() `*` in unix paths at start of path'(assert: Assert) {
        let pattern: GlobPattern = new GlobPattern(`*.exe`);

        assert.true(pattern.test('.exe'));
        assert.false(pattern.test('./program.exe'));
        assert.false(pattern.test('/a/b/program.exe'));
        assert.false(pattern.test('/a/b/c/program/package.json'));
        assert.false(pattern.test('/a/b/c/program/m/package.json'));
        assert.false(pattern.test('/a/b/c/package.json'));
    }


    @Test
    public 'test() `*` in win32 paths at begin of file name'(assert: Assert) {
        let pattern: GlobPattern = new GlobPattern(`D:\\a\\*.exe`);

        assert.false(pattern.test('D:\\program.exe'));
        assert.true(pattern.test('D:\\a\\.exe'));
        assert.true(pattern.test('D:\\a\\program.exe'));
        assert.false(pattern.test('D:\\a\\b\\c\\program.exe'));
    }


    @Test
    public 'test() `*` in win32 paths at middle of file name'(assert: Assert) {
        let pattern: GlobPattern = new GlobPattern(`D:\\projects\\_*.exe`);

        assert.false(pattern.test('D:\\program.exe'));
        assert.false(pattern.test('D:\\projects\\program.exe'));
        assert.true(pattern.test('D:\\projects\\_.exe'));
        assert.true(pattern.test('D:\\projects\\_program.exe'));
        assert.false(pattern.test('D:\\projects\\one\\createRequest\\_program.exe'));
        assert.false(pattern.test('D:\\projects\\_one\\createRequest\\_program.exe'));
        assert.false(pattern.test('D:\\projects\\_one\\createRequest\\program.exe'));
    }


    @Test
    public 'test() `*` in win32 paths at end of file name'(assert: Assert) {
        let pattern: GlobPattern = new GlobPattern(`D:\\projects\\program.*`);

        assert.false(pattern.test('D:\\program.exe'));
        assert.true(pattern.test('D:\\projects\\program.exe'));
        assert.true(pattern.test('D:\\projects\\program.'));
        assert.false(pattern.test('D:\\projects\\_program.exe'));
        assert.false(pattern.test('D:\\projects\\one\\createRequest\\program.exe'));
        assert.false(pattern.test('D:\\projects\\_one\\createRequest\\program.exe'));
        assert.false(pattern.test('D:\\projects\\_one\\createRequest\\_program.exe'));
    }


    @Test
    public 'test() `*` in win32 paths as directory name'(assert: Assert) {
        let pattern: GlobPattern = new GlobPattern(`D:\\projects\\*\\package.json`);

        assert.false(pattern.test('D:\\program.exe'));
        assert.true(pattern.test('D:\\projects\\program\\package.json'));
        assert.false(pattern.test('D:\\projects\\program\\module\\package.json'));
        assert.false(pattern.test('D:\\projects\\package.json'));
    }


    @Test
    public 'test() `*` in win32 paths at start of path'(assert: Assert) {
        let pattern: GlobPattern = new GlobPattern(`*.exe`);

        assert.true(pattern.test('.exe'));
        assert.false(pattern.test('.\\program.exe'));
        assert.false(pattern.test('D:\\program.exe'));
        assert.false(pattern.test('D:\\projects\\program\\package.json'));
        assert.false(pattern.test('D:\\projects\\program\\module\\package.json'));
        assert.false(pattern.test('D:\\projects\\package.json'));
    }


    @Test
    public 'test() `**` in unix paths matches any number of any characters'(assert: Assert) {
        let pattern: GlobPattern = new GlobPattern(`/a/b/c/**/package.json`);

        assert.false(pattern.test('/a/b/package.json'));
        assert.true(pattern.test('/a/b/c/package.json'));
        assert.true(pattern.test('/a/b/c/p/package.json'));
        assert.true(pattern.test('/a/b/c/p/m/package.json'));
        assert.true(pattern.test('/a/b/c/p/node_modules/m/package.json'));

        pattern = new GlobPattern(`**/package.json`);

        assert.false(pattern.test('pkg.json'));
        assert.true(pattern.test('package.json'));
        assert.true(pattern.test('/a/b/c/package.json'));
        assert.true(pattern.test('/a/b/c/p/package.json'));
        assert.true(pattern.test('/a/b/c/p/m/package.json'));
        assert.true(pattern.test('/a/b/c/p/node_modules/m/package.json'));

        pattern = new GlobPattern(`/a**/package.json`);

        assert.false(pattern.test('pkg.json'));
        assert.false(pattern.test('package.json'));
        assert.true(pattern.test('/a/b/c/package.json'));
        assert.true(pattern.test('/a/b/c/p/package.json'));
        assert.true(pattern.test('/a/b/c/p/m/package.json'));
        assert.true(pattern.test('/a/b/c/p/node_modules/m/package.json'));

        pattern = new GlobPattern(`/a/**c/package.json`);

        assert.false(pattern.test('pkg.json'));
        assert.false(pattern.test('package.json'));
        assert.true(pattern.test('/a/b/c/package.json'));
        assert.false(pattern.test('/a/b/c/p/package.json'));
        assert.false(pattern.test('/a/b/c/p/m/package.json'));
        assert.true(pattern.test('/a/b/c/p/node_modules/c/package.json'));
        assert.false(pattern.test('/a/b/c/p/node_modules/m/package.json'));
    }


    @Test
    public 'test() `**` win32 paths matches any number of any characters'(assert: Assert) {
        let pattern: GlobPattern = new GlobPattern(`D:\\projects\\**\\package.json`);

        assert.false(pattern.test('D:\\package.json'));
        assert.true(pattern.test('D:\\projects\\package.json'));
        assert.true(pattern.test('D:\\projects\\project\\package.json'));
        assert.true(pattern.test('D:\\projects\\project\\module\\package.json'));
        assert.true(pattern.test('D:\\projects\\project\\node_modules\\module\\package.json'));

        pattern = new GlobPattern(`**\\package.json`);

        assert.false(pattern.test('pkg.json'));
        assert.true(pattern.test('package.json'));
        assert.true(pattern.test('D:\\projects\\package.json'));
        assert.true(pattern.test('D:\\projects\\project\\package.json'));
        assert.true(pattern.test('D:\\projects\\project\\module\\package.json'));
        assert.true(pattern.test('D:\\projects\\project\\node_modules\\module\\package.json'));

        pattern = new GlobPattern(`D:\\pro**\\package.json`);

        assert.false(pattern.test('pkg.json'));
        assert.false(pattern.test('package.json'));
        assert.true(pattern.test('D:\\projects\\package.json'));
        assert.true(pattern.test('D:\\projects\\project\\package.json'));
        assert.true(pattern.test('D:\\projects\\project\\module\\package.json'));
        assert.true(pattern.test('D:\\projects\\project\\node_modules\\module\\package.json'));

        pattern = new GlobPattern(`D:\\**projects\\package.json`);

        assert.false(pattern.test('pkg.json'));
        assert.false(pattern.test('package.json'));
        assert.true(pattern.test('D:\\projects\\package.json'));
        assert.false(pattern.test('D:\\projects\\project\\package.json'));
        assert.false(pattern.test('D:\\projects\\project\\module\\package.json'));
        assert.true(pattern.test('D:\\projects\\project\\node_modules\\projects\\package.json'));
        assert.false(pattern.test('D:\\projects\\project\\node_modules\\module\\package.json'));
    }


    @Test
    public '[...] in unix paths supports character ranges'(assert: Assert) {
        let pattern: GlobPattern = new GlobPattern(`/a/b/downloads/photos[0-9][0-9][0-9][0-9].zip`);

        assert.false(pattern.test('/a/b/downloads/photos.zip'));
        assert.true(pattern.test('/a/b/downloads/photos2017.zip'));
        assert.false(pattern.test('/a/b/downloads/photos-2017.zip'));
        assert.false(pattern.test('/a/b/downloads/.zip'));
    }


    @Test
    public '[...] in win32 paths supports character ranges'(assert: Assert) {
        let pattern: GlobPattern = new GlobPattern(`D:\\downloads\\photos[0-9][0-9][0-9][0-9].zip`);

        assert.false(pattern.test('D:\\downloads\\photos.zip'));
        assert.true(pattern.test('D:\\downloads\\photos2017.zip'));
        assert.false(pattern.test('D:\\downloads\\photos-2017.zip'));
        assert.false(pattern.test('D:\\downloads\\.zip'));
    }
}

