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

gulp.task('default', function() {
  gulp.src(jsSources)
    .pipe(concat('script.min1.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
});
