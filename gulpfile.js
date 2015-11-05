var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
				.pipe(autoprefixer())
        .pipe(gulp.dest('css/'));
});

gulp.task('watch', function(){
 gulp.watch('scss/**/*.scss', ['styles']);
});

gulp.task('min', function(){
	return gulp.src('')
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(''));
});

gulp.task('compile-js', function(){
  return gulp.src('js/app_src/**/*.js')
    .pipe(concat('*.js'))
    .pipe(rename('app_test.js'))
    .pipe(gulp.dest('js/'));
});

gulp.task('default', [ 'watch' ]);
