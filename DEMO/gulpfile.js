var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	livereload = require('gulp-livereload'),
	minifyCSS = require('gulp-minify-css'),
	prefix = require('gulp-autoprefixer'),
	// concatCSS = require('gulp-concat-css'),
	sass = require('gulp-ruby-sass');

// modifies styles
gulp.task('styles', function () {
	console.log('starting styles');
	gulp.src('CDG/css/*.css')
		// .pipe(sass({ style: 'expanded'}))
		.pipe(prefix('ios >= 6', 'android >= 4.4'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('CDG/build/css/'))
		.pipe(livereload());
});

// // modifies scripts
// gulp.task('scripts', function () {
// 	console.log('starting scripts');
// 	gulp.src('pending/**/*.js')
// 		.pipe(uglify())
// 		.pipe(gulp.dest('js/'))
// 		.pipe(livereload());
// });

// watches files
gulp.task('watch', function () {
	livereload.listen();
	
	gulp.watch('CDG/css/*.css', ['styles']);

	gulp.watch('CDG/index.html')
		.on('change', livereload.changed);
});

// //runs all gulp tasks
// gulp.task('default', function () {
// 	gulp.start('styles', 'scripts');
// });