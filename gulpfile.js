const gulp = require('gulp');
const sass = require('gulp-sass');
const stripCssComments = require('gulp-strip-css-comments');
const autoprefixer = require('gulp-autoprefixer');
const removeEmptyLines = require('gulp-remove-empty-lines');

const sassConfig = {
  inputDirectory: 'sass/*.scss',
  outputDirectory: 'public/stylesheets',
  options: {
    outputStyle: 'expanded'
  }
};

gulp.task('build-css', function() {
  return gulp
    .src(sassConfig.inputDirectory)
    .pipe(sass(sassConfig.options).on('error', sass.logError))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(stripCssComments())
    .pipe(removeEmptyLines({
      removeComments: true
    }))
    .pipe(gulp.dest(sassConfig.outputDirectory));
});

gulp.task('watch', function() {
  gulp.watch('sass/*/*.scss', gulp.series('build-css'));
});
