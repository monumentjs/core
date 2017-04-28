import {Path} from '../../../../src/System/IO/Path';
import {ArgumentNullException} from '../../../../src/Core/Exceptions/ArgumentNullException';


describe(`Path`, () => {
    describe(`#constructor()`, () => {
        it(`throws if 'path' argument is not defined`, () => {
            expect(() => {
                return new Path(null);
            }).toThrowError(ArgumentNullException);

            expect(() => {
                return new Path(undefined);
            }).toThrowError(ArgumentNullException);
        });

        it(`has public properties`, () => {
            let path: Path = new Path('/home/user/documents/reports/2017FR.xlsx');

            expect(path.isAbsolute).toBe(true);
            expect(path.originalPath).toBe('/home/user/documents/reports/2017FR.xlsx');
            expect(path.directoryName).toBe('/home/user/documents/reports');
            expect(path.baseName).toBe('2017FR.xlsx');
            expect(path.baseNameWithoutExtension).toBe('2017FR');
            expect(path.extension).toBe('.xlsx');
            expect(path.root).toBe('/');
        });
    });


    describe(`#toString()`, () => {
        it(`returns original path`, () => {
            let path: Path = new Path('/home/user/documents/reports/2017FR.xlsx');

            expect(path.toString()).toBe('/home/user/documents/reports/2017FR.xlsx');
        });
    });
});
