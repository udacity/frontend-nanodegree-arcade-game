var gulp = require('gulp');
var csslint = require('gulp-csslint');
csslint.addFormatter('csslint-stylish');
var bs = require('browser-sync').create();

gulp.task('css', function() {
  gulp.src('css/style.css')
    .pipe(csslint({
      shorthand: false
    }))
    .pipe(csslint.formatter('stylish'));
});

gulp.task('serve', function() {

  bs.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('js/*.js').on('change', bs.reload);
  gulp.watch('css/*.css');
  gulp.watch('./*.html').on('change', bs.reload);
});

gulp.task('browser-sync', function() {
  bs.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('default', ['css', 'serve']);
