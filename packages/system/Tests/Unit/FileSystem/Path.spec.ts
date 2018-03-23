import * as os from 'os';
import {Test} from '../../../../test-drive/Decorators/TestConfiguration';
import {Case} from '../../../../test-drive/Decorators/Case';
import {Path} from '../../../FileSystem/Path';
import {PathFormat} from '../../../FileSystem/PathFormat';


@Test()
export class PathSpec {

    @Case()
    public 'constructor() parses unix path'() {
        let path: Path = new Path('/home/user/documents/reports/2017FR.xlsx');

        expect(path.isAbsolute).toBe(true);
        expect(path.originalPath).toBe('/home/user/documents/reports/2017FR.xlsx');
        expect(path.directoryName).toBe('/home/user/documents/reports');
        expect(path.baseName).toBe('2017FR.xlsx');
        expect(path.baseNameWithoutExtension).toBe('2017FR');
        expect(path.extension).toBe('.xlsx');
        expect(path.root).toBe('/');
    }


    @Case()
    public 'constructor() parses windows path'() {
        let path: Path = new Path('c:\\users\\documents\\reports\\2017FR.xlsx');

        expect(path.isAbsolute).toBe(true);
        expect(path.originalPath).toBe('c:\\users\\documents\\reports\\2017FR.xlsx');
        expect(path.directoryName).toBe('c:\\users\\documents\\reports');
        expect(path.baseName).toBe('2017FR.xlsx');
        expect(path.baseNameWithoutExtension).toBe('2017FR');
        expect(path.extension).toBe('.xlsx');
        expect(path.root).toBe('c:\\');
    }


    @Case()
    public 'split() splits unix path'() {
        expect(Path.split('/home/user/documents/reports/2017FR.xlsx')).toEqual([
            '/', 'home', 'user', 'documents', 'reports', '2017FR.xlsx'
        ]);
    }


    @Case()
    public 'split() splits windows path'() {
        expect(Path.split('D:\\home\\user\\documents\\reports\\2017FR.xlsx')).toEqual([
            'D:', 'home', 'user', 'documents', 'reports', '2017FR.xlsx'
        ]);
    }


    @Case()
    public 'concat() joins windows path segments'() {
        expect(
            Path.concat(
                Path.split('D:\\home\\user\\documents\\reports\\2017FR.xlsx')
            )
        ).toEqual('D:\\home\\user\\documents\\reports\\2017FR.xlsx');
    }


    @Case()
    public 'concat() joins unix path segments'() {
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


    @Case()
    public 'toString() returns original path'() {
        let posixPath: Path = new Path('/home/user/documents/reports/2017FR.xlsx');

        expect(posixPath.toString()).toBe('/home/user/documents/reports/2017FR.xlsx');

        let win32Path: Path = new Path('c:\\home\\user\\documents\\reports\\2017FR.xlsx');

        expect(win32Path.toString()).toBe('c:\\home\\user\\documents\\reports\\2017FR.xlsx');
    }


    @Case()
    public 'relative() calculates relative path'() {
        if (os.platform() === 'win32') {
            let path: string = Path.relative('c:\\home\\user', 'c:\\documents\\reports\\2017FR.xlsx');

            expect(path).toBe('..\\..\\documents\\reports\\2017FR.xlsx');
        } else {
            let path: string = Path.relative('/home/user', '/documents/reports/2017FR.xlsx');

            expect(path).toBe('../../documents/reports/2017FR.xlsx');
        }
    }


    @Case()
    public 'resolve() builds path from segments'() {
        expect(Path.resolve([
            'c:\\home\\user', '.\\reports\\2017FR.xlsx'
        ])).toBe('c:\\home\\user\\reports\\2017FR.xlsx');

        expect(Path.resolve([
            '/home/user', './reports/2017FR.xlsx'
        ])).toBe('/home/user/reports/2017FR.xlsx');
    }


    @Case()
    public 'isAbsolute() checks path is absolute'() {
        expect(Path.isAbsolute('c:\\documents\\reports\\2017FR.xlsx')).toBe(true);
        expect(Path.isAbsolute('c:\\documents\\reports')).toBe(true);
        expect(Path.isAbsolute('\\documents\\reports\\2017FR.xlsx')).toBe(true);
        expect(Path.isAbsolute('/documents/reports/2017FR.xlsx')).toBe(true);
        expect(Path.isAbsolute('/documents/reports')).toBe(true);

        expect(Path.isAbsolute('documents\\reports\\2017FR.xlsx')).toBe(false);
        expect(Path.isAbsolute('documents\\reports')).toBe(false);
        expect(Path.isAbsolute('documents/reports/2017FR.xlsx')).toBe(false);
        expect(Path.isAbsolute('documents/reports')).toBe(false);
    }


    @Case()
    public 'cast() casts path to Path class instance'() {
        expect(Path.cast('/documents/reports')).toBeInstanceOf(Path);
        expect(Path.cast(new Path('/documents/reports'))).toBeInstanceOf(Path);
    }


    @Case()
    public 'getFormat() detects path format'() {
        expect(Path.getFormat('/documents/reports')).toBe(PathFormat.Posix);
        expect(Path.getFormat('\\documents\\reports')).toBe(PathFormat.Win32);
        expect(Path.getFormat('reports')).toBe(PathFormat.Unknown);
    }


    @Case()
    public 'clone() clones path'() {
        let path = new Path('/home/user/report.txt');
        let clone = path.clone();

        expect(path.directoryName).toBe(clone.directoryName);
        expect(path.baseName).toBe(clone.baseName);
        expect(path.baseNameWithoutExtension).toBe(clone.baseNameWithoutExtension);
        expect(path.isAbsolute).toBe(clone.isAbsolute);
        expect(path.extension).toBe(clone.extension);
        expect(path.originalPath).toBe(clone.originalPath);
        expect(path.root).toBe(clone.root);
    }


    @Case()
    public 'equals() checks equality of paths'() {
        let path: Path;

        path = new Path('/home/user/report.txt');

        expect(path.equals('/home/user/report.txt')).toBe(true);
        expect(path.equals(new Path('/home/user/report.txt'))).toBe(true);

        path = new Path('D:\\home\\user\\report.txt');

        expect(path.equals('D:\\home\\user\\report.txt')).toBe(true);
        expect(path.equals(new Path('D:\\home\\user\\report.txt'))).toBe(true);
    }


    @Case()
    public 'toJSON() returns original path'() {
        expect(new Path('/home/user/report.txt').toJSON()).toBe('/home/user/report.txt');
        expect(new Path('c:\\home\\user\\report.txt').toJSON()).toBe('c:\\home\\user\\report.txt');
    }
}
