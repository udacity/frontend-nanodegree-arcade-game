const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('default', function () {
  gulp.watch('js/**/*.js',['lint']);
});

gulp.task('lint', function () {
  return gulp.src(['js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
