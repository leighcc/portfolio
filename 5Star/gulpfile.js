var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	livereload = require('gulp-livereload'),
	minifyCSS = require('gulp-minify-css'),
	prefix = require('gulp-autoprefixer');
	// concatCSS = require('gulp-concat-css'),
	// sass = require('gulp-sass');

// handle gulp errors
// function handleErrors(error) {
// 	console.error(error);
// 	this.emit('end');
// }

// modifies styles
gulp.task('styles', function () {
	console.log('starting styles');
	gulp.src('public/css/**/*.css')
		// .pipe(sass())
		// .on('error', handleErrors)
		.pipe(prefix('ios >= 6', 'android >= 4.4'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('public/build/css/'))
		.pipe(livereload());
});

// modifies vendor styles
// gulp.task("styles:vendor", function () {
// 	gulp.src('public/vendor/css/**/*.css')
// 		.pipe(concatCSS('vendor.min.css'))
// 		.pipe(minifyCSS())
// 		.pipe(gulp.dest('public/build/css/'))
// 		.pipe(livereload());
// });

// modifies scripts
gulp.task('scripts', function () {
	console.log('starting scripts');
	gulp.src('public/js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('public/build/js/'))
		.pipe(livereload());
});

// watches files
gulp.task('default', function () {
	livereload.listen();

	gulp.watch('public/js/**/*.js', ['scripts']);

	gulp.watch('public/index.html')
		.on('change', livereload.changed);

	gulp.watch('public/css/**/*.css', ['styles']);

	// gulp.watch('public/vendor/css/**/*.css', ['styles:vendor']);
});

//runs all gulp tasks
// gulp.task('default', function () {
// 	gulp.start('styles', 'scripts');
// });