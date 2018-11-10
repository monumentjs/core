const gulp = require('gulp');
const typedoc = require('gulp-typedoc');
const clean = require('gulp-clean');

gulp.task('docs', ['docs:generate']);

gulp.task('docs:generate', ['docs:clean'], function () {
    return gulp.src([
        'packages/*/index.ts'
    ]).pipe(typedoc({
        name: 'TypeScript Standard Library',
        mode: 'file',
        out: 'docs/',
        excludePrivate: true,
        tsconfig: './tsconfig.json'
    }));
});

gulp.task('docs:clean', function () {
    return gulp.src([
        './docs'
    ], {
        read: false
    }).pipe(clean());
});

