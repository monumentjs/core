import * as Gulp from 'gulp';
import * as GulpTypeDocPlugin from 'gulp-typedoc';


Gulp.task('docs:generate', () => {
    return Gulp.src('./lib/**/*.ts')
        .pipe(GulpTypeDocPlugin({
            // TypeScript compiler options

            module: 'commonjs',
            target: 'es6',
            declaration: true,
            declarationDir: 'types',
            sourceMap: true,
            moduleResolution: 'node',
            jsx: 'react',
            experimentalDecorators: true,

            out: 'docs/',
            name: 'TypeScript Standard Library',

            // TypeDoc generator options

            ignoreCompilerErrors: true
        }));
});
