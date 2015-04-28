var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  less = require('gulp-less'),
  prefix = require('gulp-autoprefixer'),
  jshint = require('gulp-jshint'),
  watch = require('gulp-watch'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload;

gulp.task('styles', function() {
  gulp.src([
    './src/less/styles.less'
  ])
  .pipe(plumber())
  .pipe(less())
  .pipe(prefix('last 8 versions', "Explorer 7"))
  .pipe(gulp.dest('./dist/css'));
});

gulp.task('lint', function() {
  gulp.src('./src/js/scripts.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('scripts', ['lint'], function() {
  gulp.src([
    './src/js/scripts.js'
  ])
  .pipe(concat('scripts.js'))
  .pipe(plumber())
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('html', function() {
  gulp.src([
    './src/index.html'
  ])
  .pipe(plumber())
  .pipe(gulp.dest('./dist'));
});

gulp.task('images', function() {
  gulp.src('./src/img/*')
  .pipe(gulp.dest('./dist/img'));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: 'index.html'
    }
  });
});

gulp.task('reload', function() {
  browserSync.reload();
});

gulp.task('build', ['styles', 'scripts', 'html', 'images']);

gulp.task('default', ['build', 'browser-sync'], function() {
  gulp.watch('./src/less/**/*.less', ['styles', 'reload']);
  gulp.watch('./src/js/scripts.js', ['scripts', 'reload']);
  gulp.watch('./src/**/*html', ['html', 'reload']);
  gulp.watch('./src/img/*', ['images', 'reload']);
});
