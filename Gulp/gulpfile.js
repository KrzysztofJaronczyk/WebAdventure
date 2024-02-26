const { src, dest, series, parallel, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const webp = require('gulp-webp')
// const imagemin = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')
const gclean = require('gulp-clean')
const kit = require('gulp-kit')

const browserSync = require('browser-sync').create()
const reload = browserSync.reload

const paths = {
	html: './html/**/*.kit',
	sass: './src/scss/**/*.scss',
	sassDest: './dist/css',
	js: './src/js/**/*.js',
	jsDest: './dist/js',
	img: './src/img/*',
	imgDest: './dist/img',
	dist: './dist',
}

function sassCompiler(done) {
	src(paths.sass)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.sassDest))
	done()
}

function jsCompiler(done) {
	src(paths.js)
		.pipe(sourcemaps.init())
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.jsDest))
	done()
}

//clean stuff
function clean(done) {
	src(paths.dist, { read: false, allowEmpty: true }).pipe(gclean())
	done()
}

function imgConverter(done) {
	src(paths.img).pipe(webp()).pipe(dest(paths.imgDest)).on('end', done)
}

// function imgConverter(done) {
// 	src(paths.img).pipe(imagemin()).pipe(dest(paths.imgDest))
// 	done()
// }

function handleKits(done) {
	src(paths.html).pipe(kit()).pipe(dest('./'))
	done()
}

function startBrowserSync(done) {
	browserSync.init({
		server: {
			baseDir: './',
		},
	})
	done()
}

function watchForChanges(done) {
	watch('./*.html').on('change', reload)
	watch([paths.html, paths.sass, paths.js], parallel(handleKits, sassCompiler, jsCompiler)).on('change', reload)
	watch(paths.img, imgConverter).on('change', reload)
	done()
}

const mainFunctions = parallel(handleKits, sassCompiler, jsCompiler, imgConverter)
exports.default = series(mainFunctions, startBrowserSync, watchForChanges)
exports.clean = clean
