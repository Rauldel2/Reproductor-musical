
var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('default', function () {
  // CREACIÓN DE SERVIDOR LOCAL
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
});