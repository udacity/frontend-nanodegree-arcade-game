var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

var jsSources = [
  'scripts/resources.js',
  'scripts/enemy.js',
  'scripts/item.js',
  'scripts/obstacle.js',
  'scripts/player.js',
  'scripts/handleInput.js',
  'scripts/levelBuilder.js',
  'scripts/uiBuilder.js',
  'scripts/engine.js'
];

gulp.task('devJs', function() {
  gulp.src(jsSources)
    .pipe(concat('app.dev4.js'))
    .pipe(gulp.dest('js/'))
});

gulp.task('liveJs', function() {
  gulp.src(jsSources)
    .pipe(concat('app.min4.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
});

gulp.task('default', ['devJs', 'liveJs']);
