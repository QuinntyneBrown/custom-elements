const gulp = require('gulp');
const tsc = require('gulp-typescript');
const clean = require('gulp-clean');

gulp.task('clean', () => {
    return gulp.src('dist/**/*.*', { read: false })
        .pipe(clean());
});

gulp.task('compile', ['clean'], function () {    
    return gulp.src(['./src/**/*.ts'])
        .pipe(tsc({
            "module": "es2015",
            "moduleResolution": "node",
            "declaration": true,
            "target": "es2015",
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "lib": [
              "es2015",
              "dom"
            ],
            "outDir": "dist",
            "skipLibCheck": true
        })).pipe(gulp.dest('dist'));

});

gulp.task('copy', ['clean'], () => {
    return gulp.src(['./src/**/*.{css,html}']).pipe(gulp.dest('dist'));
});

gulp.task('default', () => {
    return gulp.watch('./src/**/*.{css,html,ts}', ['clean', 'compile','copy']);
});