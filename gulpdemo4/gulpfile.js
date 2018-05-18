const gulp = require('gulp');
const combiner = require('stream-combiner2');
const concat = require('gulp-concat')
const path = {
    less: './src/style/*.less',
    buildLess: './build/style/',
    js: './src/js/*.js',
    buildJs: './build/js',
    build: './build',
    html: './src/index.html',
    buildHtml: './build/index.html'
}

const gutil = require('gulp-util');
let handleError = function (error) {
    gutil.log('filename:' + gutil.colors.red(error.filename));
    gutil.log('lineNumber:' + gutil.colors.red(error.lineNumber));
    gutil.log('message:' + error.message);
    gutil.log('plugin:' + gutil.colors.yellow(error.plugin));
}
//编译less，并压缩
const minifycss = require('gulp-minify-css');
const gulpLess = require('gulp-less');
gulp.task('less', function () {
    let combined = combiner.obj([
        gulp.src(path.less),
        gulpLess(),
        minifycss(),
        concat('bundle.min.css'),
        gulp.dest(path.buildLess)
    ])
    combined.on('error', handleError)
})


//编译js，并压缩
const gulpBabel = require('gulp-babel');
const uglify = require('gulp-uglify');
gulp.task('js', function () {
    let combined = combiner.obj([
        gulp.src(path.js),
        gulpBabel(),
        uglify(),
        concat('bundle.min.js'),
        gulp.dest(path.buildJs)
    ])
    combined.on('error', handleError)
})


//start
const browserSync = require('browser-sync');
const opn = require('opn') //跨平台 ） 打开文件，网站，可执行文件等。
gulp.task('start', function () {
    browserSync.init({
        server: {
            baseDir: path.build
        },
        port: 8888,
        open: false,
        ui: false
    }, function () {
        const homepage = 'localhost:8888';
        opn(homepage);
    })

    gulp.watch(path.less, ['less']);
    gulp.watch(path.js, ['js']);
    gulp.watch([path.buildHtml, path.js, path.less]).on('change', function () {
        browserSync.reload()
    })
})

//build
gulp.task("build", ['less', 'js'], function () {
    console.log('打包完成')
})