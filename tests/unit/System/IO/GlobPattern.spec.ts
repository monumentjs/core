import GlobPattern from '../../../../src/System/IO/GlobPattern';
import ArgumentNullException from '../../../../src/Core/Exceptions/ArgumentNullException';
import InvalidArgumentException from '../../../../src/Core/Exceptions/InvalidArgumentException';


describe(`GlobPattern`, () => {

    describe(`#constructor()`, () => {
        it(`throws if 'glob' argument is not defined`, () => {
            expect(() => {
                return new GlobPattern(undefined);
            }).toThrowError(ArgumentNullException);

            expect(() => {
                return new GlobPattern(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'glob' argument is empty string`, () => {
            expect(() => {
                return new GlobPattern('');
            }).toThrowError(InvalidArgumentException);
        });
    });


    describe(`#test()`, () => {
        describe(`*`, () => {
            describe(`unix paths`, () => {
                it(`at begin of file name`, () => {
                    let pattern: GlobPattern = new GlobPattern(`/home/user/projects/*.exe`);

                    expect(pattern.test('/home/user/program.exe')).toBe(false);
                    expect(pattern.test('/home/user/projects/.exe')).toBe(true);
                    expect(pattern.test('/home/user/projects/program.exe')).toBe(true);
                    expect(pattern.test('/home/user/projects/one/build/program.exe')).toBe(false);
                    expect(pattern.test('/home/user/projects/$ne/b.u.i.l.d/program.exe')).toBe(false);
                });

                it(`at middle of file name`, () => {
                    let pattern: GlobPattern = new GlobPattern(`/home/user/projects/_*.exe`);

                    expect(pattern.test('/home/user/program.exe')).toBe(false);
                    expect(pattern.test('/home/user/projects/program.exe')).toBe(false);
                    expect(pattern.test('/home/user/projects/_.exe')).toBe(true);
                    expect(pattern.test('/home/user/projects/_program.exe')).toBe(true);
                    expect(pattern.test('/home/user/projects/one/build/_program.exe')).toBe(false);
                    expect(pattern.test('/home/user/projects/_one/build/_program.exe')).toBe(false);
                    expect(pattern.test('/home/user/projects/_one/build/program.exe')).toBe(false);
                });

                it(`at end of file name`, () => {
                    let pattern: GlobPattern = new GlobPattern(`/home/user/projects/program.*`);

                    expect(pattern.test('/home/user/program.exe')).toBe(false);
                    expect(pattern.test('/home/user/projects/program.exe')).toBe(true);
                    expect(pattern.test('/home/user/projects/program.')).toBe(true);
                    expect(pattern.test('/home/user/projects/_program.exe')).toBe(false);
                    expect(pattern.test('/home/user/projects/one/build/program.exe')).toBe(false);
                    expect(pattern.test('/home/user/projects/_one/build/program.exe')).toBe(false);
                    expect(pattern.test('/home/user/projects/_one/build/_program.exe')).toBe(false);
                });

                it(`as directory name`, () => {
                    let pattern: GlobPattern = new GlobPattern(`/home/user/projects/*/package.json`);

                    expect(pattern.test('/home/user/program.exe')).toBe(false);
                    expect(pattern.test('/home/user/projects/program/package.json')).toBe(true);
                    expect(pattern.test('/home/user/projects/program/module/package.json')).toBe(false);
                    expect(pattern.test('/home/user/projects/package.json')).toBe(false);
                });

                it(`at start of path`, () => {
                    let pattern: GlobPattern = new GlobPattern(`*.exe`);

                    expect(pattern.test('.exe')).toBe(true);
                    expect(pattern.test('./program.exe')).toBe(false);
                    expect(pattern.test('/home/user/program.exe')).toBe(false);
                    expect(pattern.test('/home/user/projects/program/package.json')).toBe(false);
                    expect(pattern.test('/home/user/projects/program/module/package.json')).toBe(false);
                    expect(pattern.test('/home/user/projects/package.json')).toBe(false);
                });
            });
        });


        describe(`**`, () => {
            describe(`unix paths`, () => {
                it(`matches any number of any characters`, () => {
                    let pattern: GlobPattern = new GlobPattern(`/home/user/projects/**/package.json`);

                    expect(pattern.test('/home/user/package.json')).toBe(false);
                    expect(pattern.test('/home/user/projects/package.json')).toBe(true);
                    expect(pattern.test('/home/user/projects/project/package.json')).toBe(true);
                    expect(pattern.test('/home/user/projects/project/module/package.json')).toBe(true);
                    expect(pattern.test('/home/user/projects/project/node_modules/module/package.json')).toBe(true);

                    pattern = new GlobPattern(`**/package.json`);

                    expect(pattern.test('pkg.json')).toBe(false);
                    expect(pattern.test('package.json')).toBe(true);
                    expect(pattern.test('/home/user/projects/package.json')).toBe(true);
                    expect(pattern.test('/home/user/projects/project/package.json')).toBe(true);
                    expect(pattern.test('/home/user/projects/project/module/package.json')).toBe(true);
                    expect(pattern.test('/home/user/projects/project/node_modules/module/package.json')).toBe(true);

                    pattern = new GlobPattern(`/home**/package.json`);

                    expect(pattern.test('pkg.json')).toBe(false);
                    expect(pattern.test('package.json')).toBe(false);
                    expect(pattern.test('/home/user/projects/package.json')).toBe(true);
                    expect(pattern.test('/home/user/projects/project/package.json')).toBe(true);
                    expect(pattern.test('/home/user/projects/project/module/package.json')).toBe(true);
                    expect(pattern.test('/home/user/projects/project/node_modules/module/package.json')).toBe(true);

                    pattern = new GlobPattern(`/home/**projects/package.json`);

                    expect(pattern.test('pkg.json')).toBe(false);
                    expect(pattern.test('package.json')).toBe(false);
                    expect(pattern.test('/home/user/projects/package.json')).toBe(true);
                    expect(pattern.test('/home/user/projects/project/package.json')).toBe(false);
                    expect(pattern.test('/home/user/projects/project/module/package.json')).toBe(false);
                    expect(pattern.test('/home/user/projects/project/node_modules/projects/package.json')).toBe(true);
                    expect(pattern.test('/home/user/projects/project/node_modules/module/package.json')).toBe(false);
                });
            });
        });


        describe(`[...]`, () => {
            describe(`unix paths`, () => {
                it(`supports character ranges`, () => {
                    let pattern: GlobPattern = new GlobPattern(`/home/user/downloads/photos[0-9][0-9][0-9][0-9].zip`);

                    expect(pattern.test('/home/user/downloads/photos.zip')).toBe(false);
                    expect(pattern.test('/home/user/downloads/photos2017.zip')).toBe(true);
                    expect(pattern.test('/home/user/downloads/photos-2017.zip')).toBe(false);
                    expect(pattern.test('/home/user/downloads/.zip')).toBe(false);
                });
            });
        });
    });
});