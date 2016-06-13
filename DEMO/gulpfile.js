var gulp = require('gulp'),
	cleanCSS = require('gulp-clean-css'),
	browserSync = require('browser-sync').create();

gulp.task('minify-css', function () {
	gulp.src('pending/main.css')
		.pipe(cleanCSS())
		.pipe(gulp.dest('style'))
		.pipe(browserSync.stream());
});

gulp.task('default', ['minify-css'], function () {
	browserSync.init({
		server: "./"
	});
	gulp.watch('pending/main.css', ['minify-css']);
	gulp.watch('index.html').on('change', browserSync.reload);
});