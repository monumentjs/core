import * as os from 'os';
import {Test} from '../../../../test-drive/Decorators/TestConfiguration';
import {Case} from '../../../../test-drive/Decorators/Case';
import {Path} from '../../../file-system/Path';
import {PathFormat} from '../../../file-system/PathFormat';


export class PathSpec {

    @Test
    public 'constructor() parses unix path'(assert: Assert) {
        let path: Path = new Path('/home/user/documents/reports/2017FR.xlsx');

        assert.true(path.isAbsolute);
        assert.equals(path.originalPath, '/home/user/documents/reports/2017FR.xlsx');
        assert.equals(path.directoryName, '/home/user/documents/reports');
        assert.equals(path.baseName, '2017FR.xlsx');
        assert.equals(path.baseNameWithoutExtension, '2017FR');
        assert.equals(path.extension, '.xlsx');
        assert.equals(path.root, '/');
    }


    @Test
    public 'constructor() parses windows path'(assert: Assert) {
        let path: Path = new Path('c:\\users\\documents\\reports\\2017FR.xlsx');

        assert.true(path.isAbsolute);
        assert.equals(path.originalPath, 'c:\\users\\documents\\reports\\2017FR.xlsx');
        assert.equals(path.directoryName, 'c:\\users\\documents\\reports');
        assert.equals(path.baseName, '2017FR.xlsx');
        assert.equals(path.baseNameWithoutExtension, '2017FR');
        assert.equals(path.extension, '.xlsx');
        assert.equals(path.root, 'c:\\');
    }


    @Test
    public 'split() splits unix path'(assert: Assert) {
        assert.equals(Path.split('/home/user/documents/reports/2017FR.xlsx'), [
            '/', 'home', 'user', 'documents', 'reports', '2017FR.xlsx'
        ]);
    }


    @Test
    public 'split() splits windows path'(assert: Assert) {
        assert.equals(Path.split('D:\\home\\user\\documents\\reports\\2017FR.xlsx'), [
            'D:', 'home', 'user', 'documents', 'reports', '2017FR.xlsx'
        ]);
    }


    @Test
    public 'concat() joins windows path segments'(assert: Assert) {
        expect(
            Path.concat(
                Path.split('D:\\home\\user\\documents\\reports\\2017FR.xlsx')
            )
        ).toEqual('D:\\home\\user\\documents\\reports\\2017FR.xlsx');
    }


    @Test
    public 'concat() joins unix path segments'(assert: Assert) {
        if (os.platform() === 'win32') {
            expect(
                Path.concat(
                    Path.split('/home/user/documents/reports/2017FR.xlsx')
                )
            ).toEqual('\\home\\user\\documents\\reports\\2017FR.xlsx');
        } else {
            expect(
                Path.concat(
                    Path.split('/home/user/documents/reports/2017FR.xlsx')
                )
            ).toEqual('/home/user/documents/reports/2017FR.xlsx');
        }
    }


    @Test
    public 'toString() returns original path'(assert: Assert) {
        let posixPath: Path = new Path('/home/user/documents/reports/2017FR.xlsx');

        assert.equals(posixPath.toString(), '/home/user/documents/reports/2017FR.xlsx');

        let win32Path: Path = new Path('c:\\home\\user\\documents\\reports\\2017FR.xlsx');

        assert.equals(win32Path.toString(), 'c:\\home\\user\\documents\\reports\\2017FR.xlsx');
    }


    @Test
    public 'relative() calculates relative path'(assert: Assert) {
        if (os.platform() === 'win32') {
            let path: string = Path.relative('c:\\home\\user', 'c:\\documents\\reports\\2017FR.xlsx');

            assert.equals(path, '..\\..\\documents\\reports\\2017FR.xlsx');
        } else {
            let path: string = Path.relative('/home/user', '/documents/reports/2017FR.xlsx');

            assert.equals(path, '../../documents/reports/2017FR.xlsx');
        }
    }


    @Test
    public 'resolve() builds path from segments'(assert: Assert) {
        expect(Path.resolve([
            'c:\\home\\user', '.\\reports\\2017FR.xlsx'
        ])).toBe('c:\\home\\user\\reports\\2017FR.xlsx');

        expect(Path.resolve([
            '/home/user', './reports/2017FR.xlsx'
        ])).toBe('/home/user/reports/2017FR.xlsx');
    }


    @Test
    public 'isAbsolute() checks path is absolute'(assert: Assert) {
        assert.true(Path.isAbsolute('c:\\documents\\reports\\2017FR.xlsx'));
        assert.true(Path.isAbsolute('c:\\documents\\reports'));
        assert.true(Path.isAbsolute('\\documents\\reports\\2017FR.xlsx'));
        assert.true(Path.isAbsolute('/documents/reports/2017FR.xlsx'));
        assert.true(Path.isAbsolute('/documents/reports'));

        assert.false(Path.isAbsolute('documents\\reports\\2017FR.xlsx'));
        assert.false(Path.isAbsolute('documents\\reports'));
        assert.false(Path.isAbsolute('documents/reports/2017FR.xlsx'));
        assert.false(Path.isAbsolute('documents/reports'));
    }


    @Test
    public 'cast() casts path to Path class instance'(assert: Assert) {
        expect(Path.cast('/documents/reports')).toBeInstanceOf(Path);
        expect(Path.cast(new Path('/documents/reports'))).toBeInstanceOf(Path);
    }


    @Test
    public 'getFormat() detects path format'(assert: Assert) {
        assert.equals(Path.getFormat('/documents/reports'), PathFormat.POSIX);
        assert.equals(Path.getFormat('\\documents\\reports'), PathFormat.WIN32);
        assert.equals(Path.getFormat('reports'), PathFormat.UNKNOWN);
    }


    @Test
    public 'clone() clones path'(assert: Assert) {
        let path = new Path('/home/user/report.txt');
        let clone = path.clone();

        assert.equals(path.directoryName, clone.directoryName);
        assert.equals(path.baseName, clone.baseName);
        assert.equals(path.baseNameWithoutExtension, clone.baseNameWithoutExtension);
        assert.equals(path.isAbsolute, clone.isAbsolute);
        assert.equals(path.extension, clone.extension);
        assert.equals(path.originalPath, clone.originalPath);
        assert.equals(path.root, clone.root);
    }


    @Test
    public 'equals() checks equality of paths'(assert: Assert) {
        let path: Path;

        path = new Path('/home/user/report.txt');

        assert.true(path.equals('/home/user/report.txt'));
        assert.true(path.equals(new Path('/home/user/report.txt')));

        path = new Path('D:\\home\\user\\report.txt');

        assert.true(path.equals('D:\\home\\user\\report.txt'));
        assert.true(path.equals(new Path('D:\\home\\user\\report.txt')));
    }


    @Test
    public 'toJSON() returns original path'(assert: Assert) {
        assert.equals(new Path('/home/user/report.txt').toJSON(), '/home/user/report.txt');
        assert.equals(new Path('c:\\home\\user\\report.txt').toJSON(), 'c:\\home\\user\\report.txt');
    }
}
