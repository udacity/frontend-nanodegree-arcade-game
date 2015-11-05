var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var app_js_path = 'js/app_src/';
var app_js = [
  'welcome.js',
  'sprite.js',
  'enemy.js',
  'player.js',
  'init.js'
];

app_js.forEach(function(currentValue, index, app_js){
  app_js[index] = app_js_path + currentValue;
});

console.log(app_js);

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
	return gulp.src('js/**/*.js')
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(''));
});

gulp.task('compile-js', function(){
  return gulp.src(app_js)
    .pipe(concat('*.js'))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('js/'));
});

gulp.task('default', [ 'watch' ]);
