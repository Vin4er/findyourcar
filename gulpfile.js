var gulp = require('gulp'),
	livereload = require('gulp-livereload'),
	webserver = require('gulp-webserver'),
	autoprefixer = require('gulp-autoprefixer'),
	jade = require('gulp-jade'),
	jadeOrig = require('jade'),
	stylus = require('gulp-stylus'),
	concat = require('gulp-concat');


// Пути к файлам
path = {
	html: {
		source: ['./dev/**/*.jade', './dev/layouts/*.jade', './dev/layouts/**/*.jade'],
		watch: './dev/**/*.jade',
		destination: './public/',
		basedir: './dev'
	},
	css: {
		source: './dev/css/layout.styl',
		watch: './dev/**/*.styl',
		destination: './public/assets/css/',
		distribution: 'css.css',
		sourseMap: './dev/css'
	},
	img: {
		source: './dev/img/**/*.{jpg,jpeg,png,gif,svg}',
		watch: './dev/img/**/*',
		destination: './public/assets/img'
	},
	js: {
		source: './dev/js/**/*',
		watch: './dev/js/**/*',
		destination: './public/assets/js'
	},
	sprite: {
		source: './dev/img/sprite/*.png',
		icons: './dev/img/',
		style: './dev/css/',
		watch: './dev/img/sprite/*',

	}
};

// Локальный сервер
gulp.task('webserver', function() {
	gulp.src('public')
		.pipe(webserver({
			host: 'localhost', // Если нужен сервер в сети ставьте 0.0.0.0 localhost
			// host: '192.168.120.217', // Если нужен сервер в сети ставьте 0.0.0.0 localhost
			port: 3003,
			livereload: true,
			//open: "/index.html"
		}));
});

// Собираем JS
gulp.task('js', function() {

	gulp.src(["./dev/js/helper-page.js"])
		.pipe(concat('default_libs_script.min.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('./public/assets/js'));


	gulp.src([
			"./dev/js/lib/backbone/underscore.js",
			"./dev/js/lib/backbone/backbone.js",
			"./dev/js/bbapp/init-helpers.js",
			"./dev/js/bbapp/routes/main-router.js",
			"./dev/js/bbapp/models/main-model.js",
			"./dev/js/bbapp/view/main-view.js",
			"./dev/js/bbapp/init-bbapp.js",
		])
		.pipe(concat('bbapp.min.js'))
		.pipe(gulp.dest('./public/assets/js'));

});



// --- Собираем Stylus ---//
// налик
gulp.task('stylus', function() {
	gulp.src(path.css.source)
		.pipe(stylus())
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ie 10', 'ie 11', 'ie 12', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(concat(path.css.distribution)) // file views
		.pipe(gulp.dest(path.css.destination)); // out place
});


// --- END Собираем Stylus ---//

// Собираем html из Jade
gulp.task('jade', function() {
	gulp.src(path.html.source)
		.pipe(jade({
			jade: jadeOrig,
			pretty: '\t',
			basedir: path.html.basedir,
			data: gulp.src(['users.json'])
		}))
		.pipe(gulp.dest(path.html.destination));
});

gulp.task('fonts', function() { });
// стпрайты
gulp.task('sprite', function() { });
//Копируем изображения и сразу их обновляем
gulp.task('img', function() {});


// Watch Task
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(path.sprite.watch, ['sprite']).on('change', livereload.changed);
	gulp.watch(path.img.watch, ['img']).on('change', livereload.changed);
	gulp.watch(path.html.watch, ['jade']).on('change', livereload.changed);
	gulp.watch(path.js.watch, ['js']).on('change', livereload.changed);
	gulp.watch(path.css.watch, ['stylus']).on('change', livereload.changed);
});

gulp.task("build", ['sprite', 'img', 'jade', 'fonts', 'js', 'stylus', 'webserver']);
// Default Task
gulp.task("default", ['build', 'watch']);