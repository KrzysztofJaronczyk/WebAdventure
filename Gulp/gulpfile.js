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
const fs = require('fs')
const readline = require('readline')

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

function createStructure(done) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	process.stdin.on('data', data => {
		const answer = data.toString().trim().toLowerCase()
		if (answer === 'y') {
			rl.close()
			const folders = ['html', 'src', 'src/img', 'src/js', 'src/sass', 'dist', 'dist/css', 'dist/js']

			folders.forEach(folder => {
				if (!fs.existsSync(folder)) {
					fs.mkdirSync(folder)
					console.log(`Folder "${folder}" created.`)
				} else {
					console.log(`Folder "${folder}" already exists.`)
				}
			})

			fs.writeFileSync('./src/sass/style.scss', '* {\n\tbackground-color: #333;\n}\n')
			console.log('File "style.scss" created in "src/sass" directory.')

			fs.writeFileSync('./src/js/script.js', '')
			console.log('File "script.js" created in "src/js" directory.')

			const indexContent = `<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>Document</title>\n\t<link rel="stylesheet" href="./dist/css/style.css">\n</head>\n<body>\n\t<!-- @@include('./html/_header.kit') -->\n\t<!-- @@include('./html/_nav.kit') -->\n\n\t<main>\n\t\t<!-- Content here -->\n\t</main>\n\n\t<!-- @@include('./html/_footer.kit') -->\n</body>\n<script src="./dist/js/script.min.js"></script>\n</html>`
			fs.writeFileSync('./index.html', indexContent)
			console.log('File "index.html" created in the root directory.')

			const kitFiles = ['header', 'nav', 'footer']

			kitFiles.forEach(file => {
				fs.writeFileSync(`./html/_${file}.kit`, `<!-- ${file} -->\n   <!-- @include 'name.kit' -->`)
				console.log(`File "_${file}.kit" created in "html" directory.`)
			})

			done()
		} else if (answer === 'n') {
			console.log('Operation cancelled.')
			rl.close()
			done()
		}
	})

	rl.question('Are you sure you want to create a new structure? (y/n): ', () => {})
}
const mainFunctions = parallel(handleKits, sassCompiler, jsCompiler, imgConverter)
exports.default = series(mainFunctions, startBrowserSync, watchForChanges)
exports.clean = clean
exports.createStructure = createStructure
