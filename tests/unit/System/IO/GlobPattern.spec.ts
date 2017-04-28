import {GlobPattern} from '../../../../src/System/IO/GlobPattern';
import {ArgumentNullException} from '../../../../src/Core/Exceptions/ArgumentNullException';
import {InvalidArgumentException} from '../../../../src/Core/Exceptions/InvalidArgumentException';


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
                    let pattern: GlobPattern = new GlobPattern(`/a/b/c/*.exe`);

                    expect(pattern.test('/a/b/program.exe')).toBe(false);
                    expect(pattern.test('/a/b/c/.exe')).toBe(true);
                    expect(pattern.test('/a/b/c/program.exe')).toBe(true);
                    expect(pattern.test('/a/b/c/d/build/program.exe')).toBe(false);
                    expect(pattern.test('/a/b/c/$ne/b.u.i.l.d/program.exe')).toBe(false);
                });

                it(`at middle of file name`, () => {
                    let pattern: GlobPattern = new GlobPattern(`/a/b/c/_*.exe`);

                    expect(pattern.test('/a/b/program.exe')).toBe(false);
                    expect(pattern.test('/a/b/c/program.exe')).toBe(false);
                    expect(pattern.test('/a/b/c/_.exe')).toBe(true);
                    expect(pattern.test('/a/b/c/_program.exe')).toBe(true);
                    expect(pattern.test('/a/b/c/d/build/_program.exe')).toBe(false);
                    expect(pattern.test('/a/b/c/_one/build/_program.exe')).toBe(false);
                    expect(pattern.test('/a/b/c/_one/build/program.exe')).toBe(false);
                });

                it(`at end of file name`, () => {
                    let pattern: GlobPattern = new GlobPattern(`/a/b/c/program.*`);

                    expect(pattern.test('/a/b/program.exe')).toBe(false);
                    expect(pattern.test('/a/b/c/program.exe')).toBe(true);
                    expect(pattern.test('/a/b/c/program.')).toBe(true);
                    expect(pattern.test('/a/b/c/_program.exe')).toBe(false);
                    expect(pattern.test('/a/b/c/d/build/program.exe')).toBe(false);
                    expect(pattern.test('/a/b/c/_one/build/program.exe')).toBe(false);
                    expect(pattern.test('/a/b/c/_one/build/_program.exe')).toBe(false);
                });

                it(`as directory name`, () => {
                    let pattern: GlobPattern = new GlobPattern(`/a/b/c/*/package.json`);

                    expect(pattern.test('/a/b/program.exe')).toBe(false);
                    expect(pattern.test('/a/b/c/program/package.json')).toBe(true);
                    expect(pattern.test('/a/b/c/program/m/package.json')).toBe(false);
                    expect(pattern.test('/a/b/c/package.json')).toBe(false);
                });

                it(`at start of path`, () => {
                    let pattern: GlobPattern = new GlobPattern(`*.exe`);

                    expect(pattern.test('.exe')).toBe(true);
                    expect(pattern.test('./program.exe')).toBe(false);
                    expect(pattern.test('/a/b/program.exe')).toBe(false);
                    expect(pattern.test('/a/b/c/program/package.json')).toBe(false);
                    expect(pattern.test('/a/b/c/program/m/package.json')).toBe(false);
                    expect(pattern.test('/a/b/c/package.json')).toBe(false);
                });
            });
        
            describe(`win32 paths`, () => {
                it(`at begin of file name`, () => {
                    let pattern: GlobPattern = new GlobPattern(`D:\\a\\*.exe`);

                    expect(pattern.test('D:\\program.exe')).toBe(false);
                    expect(pattern.test('D:\\a\\.exe')).toBe(true);
                    expect(pattern.test('D:\\a\\program.exe')).toBe(true);
                    expect(pattern.test('D:\\a\\b\\c\\program.exe')).toBe(false);
                });

                it(`at middle of file name`, () => {
                    let pattern: GlobPattern = new GlobPattern(`D:\\projects\\_*.exe`);

                    expect(pattern.test('D:\\program.exe')).toBe(false);
                    expect(pattern.test('D:\\projects\\program.exe')).toBe(false);
                    expect(pattern.test('D:\\projects\\_.exe')).toBe(true);
                    expect(pattern.test('D:\\projects\\_program.exe')).toBe(true);
                    expect(pattern.test('D:\\projects\\one\\build\\_program.exe')).toBe(false);
                    expect(pattern.test('D:\\projects\\_one\\build\\_program.exe')).toBe(false);
                    expect(pattern.test('D:\\projects\\_one\\build\\program.exe')).toBe(false);
                });

                it(`at end of file name`, () => {
                    let pattern: GlobPattern = new GlobPattern(`D:\\projects\\program.*`);

                    expect(pattern.test('D:\\program.exe')).toBe(false);
                    expect(pattern.test('D:\\projects\\program.exe')).toBe(true);
                    expect(pattern.test('D:\\projects\\program.')).toBe(true);
                    expect(pattern.test('D:\\projects\\_program.exe')).toBe(false);
                    expect(pattern.test('D:\\projects\\one\\build\\program.exe')).toBe(false);
                    expect(pattern.test('D:\\projects\\_one\\build\\program.exe')).toBe(false);
                    expect(pattern.test('D:\\projects\\_one\\build\\_program.exe')).toBe(false);
                });

                it(`as directory name`, () => {
                    let pattern: GlobPattern = new GlobPattern(`D:\\projects\\*\\package.json`);

                    expect(pattern.test('D:\\program.exe')).toBe(false);
                    expect(pattern.test('D:\\projects\\program\\package.json')).toBe(true);
                    expect(pattern.test('D:\\projects\\program\\module\\package.json')).toBe(false);
                    expect(pattern.test('D:\\projects\\package.json')).toBe(false);
                });

                it(`at start of path`, () => {
                    let pattern: GlobPattern = new GlobPattern(`*.exe`);

                    expect(pattern.test('.exe')).toBe(true);
                    expect(pattern.test('.\\program.exe')).toBe(false);
                    expect(pattern.test('D:\\program.exe')).toBe(false);
                    expect(pattern.test('D:\\projects\\program\\package.json')).toBe(false);
                    expect(pattern.test('D:\\projects\\program\\module\\package.json')).toBe(false);
                    expect(pattern.test('D:\\projects\\package.json')).toBe(false);
                });
            });
        });


        describe(`**`, () => {
            describe(`unix paths`, () => {
                it(`matches any number of any characters`, () => {
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
                });
            });
        
            describe(`win32 paths`, () => {
                it(`matches any number of any characters`, () => {
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
                });
            });
        });


        describe(`[...]`, () => {
            describe(`unix paths`, () => {
                it(`supports character ranges`, () => {
                    let pattern: GlobPattern = new GlobPattern(`/a/b/downloads/photos[0-9][0-9][0-9][0-9].zip`);

                    expect(pattern.test('/a/b/downloads/photos.zip')).toBe(false);
                    expect(pattern.test('/a/b/downloads/photos2017.zip')).toBe(true);
                    expect(pattern.test('/a/b/downloads/photos-2017.zip')).toBe(false);
                    expect(pattern.test('/a/b/downloads/.zip')).toBe(false);
                });
            });
        
            describe(`win32 paths`, () => {
                it(`supports character ranges`, () => {
                    let pattern: GlobPattern = new GlobPattern(`D:\\downloads\\photos[0-9][0-9][0-9][0-9].zip`);

                    expect(pattern.test('D:\\downloads\\photos.zip')).toBe(false);
                    expect(pattern.test('D:\\downloads\\photos2017.zip')).toBe(true);
                    expect(pattern.test('D:\\downloads\\photos-2017.zip')).toBe(false);
                    expect(pattern.test('D:\\downloads\\.zip')).toBe(false);
                });
            });
        });
    });
});